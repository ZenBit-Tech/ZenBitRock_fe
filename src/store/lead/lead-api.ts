import { QobrixLeadDetailsResponse } from 'types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';

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
      transformResponse: (response: QobrixLeadDetailsResponse) => {
        response.matchingProperties = response.matchingProperties.map((property) => ({
          ...property,
          saleRent: property.sale_rent,
          price: property.list_selling_price_amount,
          photo: property.media?.[0]?.file?.thumbnails?.medium || '',
        }));

        return response;
      },
    }),
  }),
});

export const { useGetLeadDetailsQuery } = LeadApi;
