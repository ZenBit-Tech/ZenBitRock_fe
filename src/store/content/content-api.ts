import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { IContentResponse, IContentUpdateRequest } from 'types';
import { IContentAddRequest } from 'types/content';

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
    getContent: builder.query<IContentResponse[], void>({
      query: () => ({
        url: ApiRoute.CONTENT,
        method: 'GET',
      }),
      providesTags: ['Get content'],
    }),

    updateContentChecked: builder.mutation<IContentResponse, IContentUpdateRequest>({
      query: (args) => ({
        url: ApiRoute.CONTENT_CHECK.replace('id', args.id as string),
        method: 'PATCH',
        body: { checked: args.checked },
      }),
    }),
    addContent: builder.mutation<IContentResponse, IContentAddRequest>({
      query: (contentData) => ({
        url: ApiRoute.ADD_CONTENT,
        method: 'POST',
        body: contentData,
      }),
      invalidatesTags: [{ type: 'Get content' }],
    }),
    deleteContent: builder.mutation<void, string>({
      query: (contentId) => ({
        url: `${ApiRoute.CONTENT}/${contentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Get content' }],
    }),
  }),
});

export const {
  useUpdateContentCheckedMutation,
  useAddContentMutation,
  useGetContentQuery,
  useDeleteContentMutation,
} = ContentApi;
