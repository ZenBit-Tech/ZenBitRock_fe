import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { links } from 'constants/links';

type SendCode = { email: string | null };
type VerifyCode = { email: string | null; code: string };

export const RestorePasswordApi = createApi({
  reducerPath: 'restorePasswordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Restore password'],
  endpoints: (builder) => ({
    sendCode: builder.mutation({
      query: (body: SendCode) => {
        return {
          url: links.SEND_CODE_FOR_RESTORE_PASSWORD,
          method: 'POST',
          body,
        };
      },
    }),
    verifyCode: builder.mutation({
      query: (body: VerifyCode) => {
        return {
          url: links.CONFIRM_CODE_FOR_RESTORE_PASSWORD,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useSendCodeMutation, useVerifyCodeMutation } = RestorePasswordApi;
