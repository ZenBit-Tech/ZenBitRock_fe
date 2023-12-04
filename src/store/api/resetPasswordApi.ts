import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';

type VerifyOldPassword = {oldPassword: string };
type ChangePassword = { oldPassword: string | null; newPassword: string | null };
type ResponseData = {
  data: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
};

/*type ResponseVerifyData = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};*/

export const ResetPasswordApi = createApi({
  reducerPath: 'resetPasswordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Reset password'],
  endpoints: (builder) => ({
    verifyOldPassword: builder.mutation<ResponseData['data'], VerifyOldPassword>({
      query: (body) => ({
        url: ApiRoute.VERIFY_OLD_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<ResponseData['data'], ChangePassword>({
      query: (body) => ({
        url: ApiRoute.CHANGE_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useVerifyOldPasswordMutation, useChangePasswordMutation } =
  ResetPasswordApi;
