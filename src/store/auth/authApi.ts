import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { StorageKey } from 'enums';
import { SendVerificationCodeResponse, VerifyEmailResponse } from './lib/types';

export interface IUserData {
  email: string;
  password: string;
}

interface ILoginResData {
  data: { email: string; id: string; token: string };
}

interface ISignUpResData {
  data: {
    token: string;
    user: {
      email: string;
      id: string;
    };
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
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          enqueueSnackbar('Please enter valid credentials!', {
            variant: 'error',
          });
        }
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    signUp: builder.mutation<ISignUpResData['data'], IUserData>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          enqueueSnackbar('User with this email already exists', { variant: 'error' });
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
    getProfile: builder.query<ILoginResData['data'], void>({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
  useGetProfileQuery,
} = authApi;
