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
    getContent: builder.mutation<IContentResponse[], void>({
      query: () => ({
        url: ApiRoute.CONTENT,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Get content' }],
    }),

    updateContentChecked: builder.mutation<IContentResponse, IContentUpdateRequest>({
      query: (args) => ({
        url: ApiRoute.CONTENT_CHECK.replace('id', args.id as string),
        method: 'PATCH',
        body: { checked: args.checked },
      }),
    }),
  }),
});

export const { useGetContentMutation, useUpdateContentCheckedMutation } = ContentApi;
