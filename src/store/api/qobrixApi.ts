import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import {
  QobrixAgentRequest,
  QobrixAgentResponse,
  QobrixContactRequest,
  QobrixContactResponse,
  QobrixPropertyTypeResponse,
} from 'types';
import { IUserUpdateQobrix } from 'types/user';

export const QobrixApi = createApi({
  reducerPath: 'QobrixApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_QOBRIX_PROXY_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

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
    getPropertyTypes: builder.query<QobrixPropertyTypeResponse, undefined>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_PROPERY_TYPES,
        method: 'GET',
        body,
      }),
    }),
    updateContact: builder.mutation<QobrixContactResponse['data'], IUserUpdateQobrix>({
      query: ({ qobrixId, ...body }) => ({
        url: `${ApiRoute.QOBRIX_CREATE_CONTACT}/${qobrixId}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteLead: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${ApiRoute.QOBRIX_DELETE_LEAD}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useCreateAgentMutation,
  useGetPropertyTypesQuery,
  useUpdateContactMutation,
  useDeleteLeadMutation,
} = QobrixApi;
