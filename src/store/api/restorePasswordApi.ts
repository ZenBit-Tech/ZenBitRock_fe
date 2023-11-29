import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute } from 'enums';

type SendCode = { email: string | null };
type VerifyCode = { email: string | null; code: string };
type ResetPassword = { email: string | null; password: string; code: string | null };
type ResponseData = {
  error: {
    data: {
      message: string;
      error: string;
      statusCode: number;
    };
    status: number;
  };
};

export const RestorePasswordApi = createApi({
  reducerPath: 'restorePasswordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Restore password'],
  endpoints: (builder) => ({
    sendCode: builder.mutation<ResponseData, SendCode>({
      query: (body) => {
        return {
          url: ApiRoute.SEND_CODE_FOR_RESTORE_PASSWORD,
          method: 'POST',
          body,
        };
      },
    }),
    verifyCode: builder.mutation<ResponseData, VerifyCode>({
      query: (body) => {
        return {
          url: ApiRoute.CONFIRM_CODE_FOR_RESTORE_PASSWORD,
          method: 'POST',
          body,
        };
      },
    }),
    resetPassword: builder.mutation<ResponseData, ResetPassword>({
      query: (body) => ({
        url: ApiRoute.CONFIRM_RESTORE_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendCodeMutation, useVerifyCodeMutation, useResetPasswordMutation } =
  RestorePasswordApi;
