import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatInfoResponse } from 'types/chats';
import { IChatResponse, ICreatePrivateChatRequest } from 'types/chat';
import { ApiRoute, ChatEvent, StorageKey } from 'enums';
import { ICreateGroupChatRequest, Message, IChatRequest, Chat } from 'types';
import { createSocketFactory } from 'utils';

const getSocket = createSocketFactory();

export const ChatApi = createApi({
  reducerPath: 'ChatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Create chat'],
  endpoints: (builder) => ({
    createGroupChat: builder.mutation<IChatResponse, ICreateGroupChatRequest>({
      query: (body) => ({
        url: ApiRoute.CHATS,
        method: 'POST',
        body,
      }),
    }),

    createChat: builder.mutation<IChatResponse, ICreatePrivateChatRequest>({
      query: (body) => ({
        url: ApiRoute.CHATS,
        method: 'POST',
        body,
      }),
    }),

    checkPrivateChat: builder.query<{ chatId: string | null }, string>({
      query: (agentId) => ({
        url: `${ApiRoute.CHATS}/${ApiRoute.CHECK_PRIVATE_CHAT}/${agentId}`,
        method: 'GET',
      }),
    }),

    getChatById: builder.query<ChatInfoResponse, string>({
      query: (chatId) => ({
        url: `${ApiRoute.CHATS}/${chatId}`,
        method: 'GET',
      }),
    }),

    sendMessage: builder.mutation<Message, { chatId: string; content: string }>({
      queryFn: (chatMessageContent: { chatId: string; content: string }) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(ChatEvent.NewMessage, chatMessageContent, (message: Message) => {
            resolve({ data: message });
          });
        });
      },
    }),
    getMessages: builder.query<Message[], { chatId: string; id: string | null }>({
      queryFn: () => ({ data: [] }),

      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.emit(ChatEvent.RequestAllMessages, arg, (messages: Message[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...messages);
            });
          });

          socket.on(ChatEvent.NewMessage, (message: Message) => {
            updateCachedData((draft) => {
              if (message.chat.id === arg.chatId) {
                draft.push(message);
              }
            });
          });

          await cacheEntryRemoved;

          socket.close();
        } catch (error) {
          throw error;
        }
      },
    }),

    getUnreadMessagesCount: builder.query<number, void>({
      queryFn: () => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(ChatEvent.RequestUnreadMessagesCount, (unreadCount: number) => {
            console.log(unreadCount);
            resolve({ data: unreadCount });
          });
        });
      },
    }),

    markMessageAsRead: builder.mutation<void, { messageId: string; chatId: string }>({
      queryFn: async ({ messageId, chatId }) => {
        const socket = getSocket();

        return new Promise<void>((resolve) => {
          socket.emit(ChatEvent.RequestMarkAsRead, { messageId, chatId }, () => {
            resolve();
          });
        }).then();
      },
    }),

    getUnreadMessagesCountByChatId: builder.query<number, { chatId: string }>({
      queryFn: () => ({ data: 0 }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on(ChatEvent.RequestUnreadMessagesByIdCount, (unreadCount: number) => {
            updateCachedData((existingData: number | undefined) => {
              if (existingData !== undefined) {
                return existingData + unreadCount;
              }

              return unreadCount;
            });
          });

          await cacheEntryRemoved;

          socket.off(ChatEvent.RequestUnreadMessagesByIdCount);
        } catch (error) {
          throw error;
        }
      },
    }),

    deleteChat: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: ApiRoute.CHAT_WITH_ID.replace('id', id),
        method: 'DELETE',
      }),
    }),
    updateChat: builder.mutation<IChatResponse['chat'], IChatRequest>({
      query: ({ id, title, memberIds }) => ({
        url: ApiRoute.CHAT_WITH_ID.replace('id', id as string),
        method: 'PATCH',
        body: { title, memberIds },
      }),
    }),
    getChats: builder.query<Chat[], { userId: string }>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          socket.emit(ChatEvent.RequestAllChats, arg, (chats: Chat[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...chats);
            });
          });

          socket.on(ChatEvent.NewMessage, (message: Message) => {
            updateCachedData((draft) => {
              draft.forEach((existingChat) => {
                if (existingChat.id === message.chat.id) {
                  existingChat.messages.push(message);
                }
              });
            });
          });

          socket.on(ChatEvent.NewChat, (chat: Chat) => {
            updateCachedData((draft) => {
              chat.members.forEach((member) => {
                if (member.id === arg.userId) {
                  draft.push(chat);
                }
              });
            });
          });

          await cacheEntryRemoved;
          socket.close();
        } catch (error) {
          throw error;
        }
      },
    }),
  }),
});

export const {
  useCreateGroupChatMutation,
  useDeleteChatMutation,
  useUpdateChatMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetUnreadMessagesCountQuery,
  useCreateChatMutation,
  useCheckPrivateChatQuery,
  useGetChatByIdQuery,
  useGetChatsQuery,
  useMarkMessageAsReadMutation,
  useGetUnreadMessagesCountByChatIdQuery,
} = ChatApi;
