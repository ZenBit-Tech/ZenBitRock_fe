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
      { search: string; page: number; leadId: string }
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
          price: property.sale_rent !== 'for_rent' ? property.list_selling_price_amount : undefined,
          priceRental:
            property.sale_rent !== 'for_sale' ? property.list_rental_price_amount : undefined,
          photo: property.media?.[0]?.file?.thumbnails?.medium || '',
        }));

        return response;
      },
      serializeQueryArgs: ({ queryArgs }) => queryArgs.leadId,

      merge: (currentCache, newItems) => {
        if (newItems.pagination.current_page === 1) {
          currentCache.data = newItems.data;
        } else {
          currentCache.data.push(...newItems.data);
        }
        currentCache.pagination = newItems.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});



export const { useGetLeadDetailsQuery, useGetMatchingPropertiesQuery } = LeadApi;
