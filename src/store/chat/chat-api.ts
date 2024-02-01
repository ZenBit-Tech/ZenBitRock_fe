import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Chat, ChatInfoResponse, ChatsRequest } from 'types/chats';
import { IChatResponse, ICreatePrivateChatRequest } from 'types/chat';
import { ApiRoute, ChatEvent, StorageKey } from 'enums';
import { ICreateGroupChatRequest, Message, IChatRequest } from 'types';
import { getSocket } from 'store/app-socket-factory';

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
    getMessages: builder.query<Message[], { chatId: string }>({
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

          socket.on(ChatEvent.RequestUnreadMessagesCountUpdated, (chatIdIn) => {
            if (chatIdIn !== arg.chatId) {
              return;
            }
            socket.emit(ChatEvent.RequestAllMessages, arg, (messages: Message[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...messages);
              });
            });
          });

          await cacheEntryRemoved;
        } catch (error) {
          throw error;
        }
      },
    }),

    getUnreadMessagesCount: builder.query<number, void>({
      queryFn: () => ({ data: 0 }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          socket.emit(ChatEvent.RequestUnreadMessagesCount, (unreadCount: number) => {
            updateCachedData((draft) => unreadCount);
          });

          socket.on(ChatEvent.RequestUnreadMessagesCountUpdated, (chatIdIn) => {
            if (chatIdIn) {
              return;
            }
            socket.emit(ChatEvent.RequestUnreadMessagesCount, (unreadCount: number) => {
              updateCachedData((draft) => unreadCount);
            });
          });

          await cacheEntryRemoved;
        } catch (error) {
          throw error;
        }
      },
    }),

    getUnreadMessagesCountByChatId: builder.query<number, { chatId: string | undefined }>({
      queryFn: () => ({ data: 0 }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          socket.emit(
            ChatEvent.RequestUnreadMessagesByIdCount,
            arg.chatId,
            (unreadCount: number) => {
              updateCachedData((draft) => unreadCount);
            }
          );

          socket.on(ChatEvent.RequestUnreadMessagesCountUpdated, (chatIdIn) => {
            if (chatIdIn !== arg.chatId) {
              return;
            }
            socket.emit(
              ChatEvent.RequestUnreadMessagesByIdCount,
              arg.chatId,
              (unreadCount: number) => {
                updateCachedData((draft) => unreadCount);
              }
            );
          });
          await cacheEntryRemoved;
        } catch (error) {
          throw error;
        }
      },
    }),

    markMessageAsRead: builder.mutation<void, { messageId: string }>({
      queryFn: async ({ messageId }) => {
        const socket = getSocket();

        return new Promise<void>((resolve) => {
          socket.emit(ChatEvent.RequestMarkAsRead, { messageId }, () => {
            resolve();
          });
        }).then();
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
    getChats: builder.query<Chat[], ChatsRequest>({
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

          socket.on(ChatEvent.NewMessage, () => {
            socket.emit(ChatEvent.RequestAllChats, arg, (chats: Chat[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...chats);
              });
            });
          });

          socket.on(ChatEvent.NewChat, () => {
            socket.emit(ChatEvent.RequestAllChats, arg, (chats: Chat[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...chats);
              });
            });
          });

          socket.on(ChatEvent.ChatDeleted, () => {
            socket.emit(ChatEvent.RequestAllChats, arg, (chats: Chat[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...chats);
              });
            });
          });

          socket.on(ChatEvent.ChatUpdated, () => {
            socket.emit(ChatEvent.RequestAllChats, arg, (chats: Chat[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...chats);
              });
            });
          });

          await cacheEntryRemoved;
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
