import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { links } from 'constants/links';

export const RestoreEmailApi = createApi({
  reducerPath: 'restoreEmailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Restore email'],
  endpoints: (builder) => ({
    sendCode: builder.mutation({
      query: (body) => {
        return {
          url: links.SEND_CODE_FOR_RESTORE_PASSWORD,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useSendCodeMutation } = RestoreEmailApi;
