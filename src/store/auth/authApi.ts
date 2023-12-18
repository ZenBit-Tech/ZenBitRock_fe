import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';
import { StorageKey } from 'enums';
import { errMessages } from 'constants/errMessages';
import { statusCodes } from 'constants/statusCodes';
import { SendVerificationCodeResponse, UserAuthResponse, UserProfileResponse } from './lib/types';

export interface IUserData {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<UserAuthResponse, IUserData>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error.data?.statusCode === statusCodes.UNAUTHORIZED) {
            enqueueSnackbar(`${errMessages.SIGN_IN_ERR_MSG}`, {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(`${err.error.data.message}`, { variant: 'error' });
          }
        }
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    signUp: builder.mutation<UserAuthResponse, IUserData>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error.data.statusCode === statusCodes.UNAUTHORIZED) {
            enqueueSnackbar(`${errMessages.SIGN_UP_ERR_MSG}`, { variant: 'error' });
          } else {
            enqueueSnackbar(`${err.error.data.message}`, { variant: 'error' });
          }
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
    verifyEmail: builder.mutation<UserProfileResponse, { email: string; code: string }>({
      query: (body) => ({
        url: 'auth/confirm-email',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<UserProfileResponse, void>({
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
