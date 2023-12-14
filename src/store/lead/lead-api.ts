import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { QobrixLeadDetailsResponse } from 'types';

export const LeadApi = createApi({
  reducerPath: 'LeadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Get lead details'],
  endpoints: (builder) => ({
    getLeadDetails: builder.query<QobrixLeadDetailsResponse, string>({
      query: (arg) => ({
        url: ApiRoute.GET_LEAD_DETAILS.replace('id', arg),
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLeadDetailsQuery } = LeadApi;
