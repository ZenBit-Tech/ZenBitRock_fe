import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IChatByIdResponse, IChatResponse, ICreatePrivateChatRequest } from 'types/chat';
import { ApiRoute, ChatEvent, StorageKey } from 'enums';
import { ICreateGroupChatRequest, ICreateGroupChatResponse, Message } from 'types';
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
    createGroupChat: builder.mutation<ICreateGroupChatResponse, ICreateGroupChatRequest['data']>({
      query: (body) => ({
        url: ApiRoute.CHAT_CREATE_GROUP,
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
        url: `${ApiRoute.CHATS}/check-private-chat/${agentId}`,
        method: 'GET',
      }),
    }),

    getChatById: builder.query<IChatByIdResponse, string>({
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

          socket.on('connect', () => {
            socket.emit(ChatEvent.RequestAllMessages, arg.chatId, (messages: Message[]) => {
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...messages);
              });
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

          socket.off('connect');
          socket.off(ChatEvent.RequestAllMessages);
          socket.off(ChatEvent.NewMessage);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getUnreadMessages: builder.query<number, void>({
      query: () => 'getUnreadMessages',
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on(ChatEvent.RequestUnreadMessages, (unreadCount: number) => {
            updateCachedData((existingData: number | undefined) => {
              if (existingData !== undefined) {
                return existingData + unreadCount;
              }

              return unreadCount;
            });
          });

          await cacheEntryRemoved;

          socket.off(ChatEvent.RequestUnreadMessages);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useCreateGroupChatMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetUnreadMessagesQuery,
  useCreateChatMutation,
  useCheckPrivateChatQuery,
} = ChatApi;
