import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import {
  QobrixAgentRequest,
  QobrixAgentResponse,
  QobrixContactRequest,
  QobrixContactResponse,
  QobrixCreateLead,
  QobrixCreateLeadResponse,
  QobrixPropertyTypeResponse,
} from 'types';
import { QobrixLocationsResponse } from 'types/qobrix/qobrix-locations';
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
    createLead: builder.mutation<QobrixCreateLeadResponse['data'], QobrixCreateLead>({
      query: (body) => ({
        url: ApiRoute.QOBRIX_CREATE_LEAD,
        method: 'POST',
        body,
      }),
    }),
    searchLocations: builder.query<
      QobrixLocationsResponse,
      { find: string; limit?: number; page?: number }
    >({
      query: ({ find, limit = 100, page = 1 }) => ({
        url: `${ApiRoute.QOBRIX_SEARCH_LOCATIONS}?find=${find}&limit=${limit}&page=${page}`,
        method: 'GET',
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
  useCreateLeadMutation,
  useSearchLocationsQuery,
} = QobrixApi;
