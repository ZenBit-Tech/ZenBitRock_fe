import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { IUnreadMessagesQuantityRequest, IUnreadMessagesQuantityResponse } from 'types';

export const MessageApi = createApi({
  reducerPath: 'MessageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Get messages'],
  endpoints: (builder) => ({
    getUnreadMessages: builder.query<
      IUnreadMessagesQuantityResponse,
      IUnreadMessagesQuantityRequest
    >({
      query: (arg) => ({
        url: ApiRoute.MESSAGES_GET_UNREAD.replace('id', arg.id),
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUnreadMessagesQuery } = MessageApi;
