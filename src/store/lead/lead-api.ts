import { QobrixLeadDetailsResponse } from 'types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { QobrixPropertyListResponse } from 'types/qobrix';

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
    getMatchingProperties: builder.query<
      QobrixPropertyListResponse,
      { search: string; page: number }
    >({
      query: (arg) => ({
        url: ApiRoute.GET_MATCHING_PROPERTIES,
        method: 'GET',
        params: { search: arg.search, page: arg.page },
      }),
      transformResponse: (response: QobrixPropertyListResponse) => {
        response.data = response.data.map((property) => ({
          ...property,
          saleRent: property.sale_rent,
          price: property.list_selling_price_amount,
          photo: property.media?.[0]?.file?.thumbnails?.medium || '',
        }));

        return response;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
        currentCache.pagination = newItems.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetLeadDetailsQuery, useGetMatchingPropertiesQuery } = LeadApi;
