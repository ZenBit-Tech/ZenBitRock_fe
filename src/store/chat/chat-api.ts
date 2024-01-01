import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import {
  ICreateGroupChatRequest,
  ICreateGroupChatResponse,
  IGetChatResponse,
  IUpdateChatResponse,
  IUpdateChatRequest,
} from 'types';

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
        url: ApiRoute.CHATS,
        method: 'POST',
        body,
      }),
    }),
    getChatById: builder.query<IGetChatResponse['data'], { id: string }>({
      query: ({ id }) => ({
        url: ApiRoute.CHAT_WITH_ID.replace('id', id),
        method: 'GET',
      }),
    }),
    deleteChat: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${ApiRoute.CHAT_WITH_ID}/${id}`,
        method: 'DELETE',
      }),
    }),
    updateChat: builder.mutation<IUpdateChatResponse, IUpdateChatRequest>({
      query: ({ id, title, members }) => ({
        url: `${ApiRoute.CHAT_WITH_ID}/${id}`,
        method: 'PATCH',
        body: { title, members },
      }),
    }),
  }),
});

export const { useCreateGroupChatMutation, useDeleteChatMutation, useGetChatByIdQuery } = ChatApi;
