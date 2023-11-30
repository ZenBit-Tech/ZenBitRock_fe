import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { QobrixAgentRequest, QobrixAgentResponse } from 'types/qobrix-agent';
import { QobrixContactRequest, QobrixContactResponse } from 'types/qobrix-contact';

export const QobrixApi = createApi({
  reducerPath: 'QobrixApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_QOBRIX_PROXY_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);
      headers.set('X-Api-Key', process.env.NEXT_PUBLIC_QOBRIX_API_KEY || '');
      headers.set('X-Api-User', process.env.NEXT_PUBLIC_QOBRIX_API_USER || '');

      return headers;
    },
  }),
  tagTypes: ['Create qobrix contact'],
  endpoints: (builder) => ({
    createContact: builder.mutation<QobrixContactResponse['data'], QobrixContactRequest>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_CONTACT,
        method: 'POST',
        body,
      }),
    }),
    createAgent: builder.mutation<QobrixAgentResponse['data'], QobrixAgentRequest>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_AGENT,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateContactMutation, useCreateAgentMutation } = QobrixApi;