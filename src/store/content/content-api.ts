import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { IContentResponse, IContentUpdateRequest } from 'types';

export const ContentApi = createApi({
  reducerPath: 'ContentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Get content'],
  endpoints: (builder) => ({
    getContent: builder.query<IContentResponse, void>({
      query: () => ({
        url: ApiRoute.CONTENT,
        method: 'GET',
      }),
    }),

    updateContentChecked: builder.mutation<IContentResponse, IContentUpdateRequest>({
      query: ({ updates }) => ({
        url: ApiRoute.CONTENT,
        method: 'PATCH',
        body: updates,
      }),
    }),
  }),
});

export const { useGetContentQuery, useUpdateContentCheckedMutation } = ContentApi;
