import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { ICreateGroupChatRequest, ICreateGroupChatResponse } from 'types';

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
  }),
});

export const { useCreateGroupChatMutation } = ChatApi;
