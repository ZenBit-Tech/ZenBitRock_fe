import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { SendVerificationCodeResponse, VerifyEmailResponse } from './lib/types';

export interface IUserData {
  email: string;
  password: string;
}

interface ILoginResData {
  data: { email: string; id: string; token: string };
}

interface ILoginResError {
  error: {
    status: number;
    data: {
      message: string;
      error: string;
      statusCode: number;
    };
  };
}

interface IUserDataResponse {
  user: {
    email: string;
    password?: string;
  };
}

export const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<ILoginResData['data'], IUserData>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),
    signUp: builder.mutation<IUserDataResponse, IUserData>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          enqueueSnackbar('Something went wrong! Please, sign up first or check your password!', {
            variant: 'error',
          });
        }
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    sendVerificationCode: builder.mutation<SendVerificationCodeResponse, Pick<IUserData, 'email'>>({
      query: (body) => ({
        url: 'email/confirm',
        method: 'POST',
        body,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, { email: string; code: string }>({
      query: (body) => ({
        url: 'auth/confirm-email',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
} = authApi;
