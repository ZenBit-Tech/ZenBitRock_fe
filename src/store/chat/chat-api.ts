import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, ChatEvent, StorageKey } from 'enums';
import { ICreateGroupChatRequest, ICreateGroupChatResponse, Chat } from 'types';
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
  tagTypes: ['Create group chat'],
  endpoints: (builder) => ({
    createGroupChat: builder.mutation<ICreateGroupChatResponse, ICreateGroupChatRequest['data']>({
      query: (body) => ({
        url: ApiRoute.CHAT_CREATE_GROUP,
        method: 'POST',
        body,
      }),
    }),
    getChats: builder.query<Chat[], { userId: string }>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on('connect', () => {
            console.log('Socket connected');
            socket.emit(ChatEvent.RequestAllChats, arg.userId, (chats: Chat[]) => {
              console.log('Chats received:', chats);
              updateCachedData((draft) => {
                draft.splice(0, draft.length, ...chats);
              });
            });
          });

          await cacheEntryRemoved;

          socket.off('connect');
          socket.off(ChatEvent.RequestAllChats);
          console.log('Socket disconnected');
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useCreateGroupChatMutation, useGetChatsQuery } = ChatApi;
