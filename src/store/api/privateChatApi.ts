import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import {
  CreateRoomRequest,
  CreateRoomResponse,
  CreateMessageResponse,
  CreateMessageRequest,
  getMessagesRequest,
  getMessageResponse,
} from 'types/chat';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Rooms', 'Messages'],
  endpoints: (builder) => ({
    createRoom: builder.mutation<CreateRoomResponse, CreateRoomRequest>({
      query: (body) => ({
        url: ApiRoute.CREATE_ROOM,
        method: 'POST',
        body,
      }),
    }),
    getMessages: builder.query<getMessageResponse[], getMessagesRequest>({
      query: ({ roomId }) => ({
        url: `${ApiRoute.MESSAGES}?roomId=${roomId}`,
        method: 'GET',
      }),
    }),
    createMessage: builder.mutation<CreateMessageResponse, CreateMessageRequest>({
      query: (body) => ({
        url: ApiRoute.MESSAGES,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateRoomMutation, useGetMessagesQuery, useCreateMessageMutation } = chatApi;
