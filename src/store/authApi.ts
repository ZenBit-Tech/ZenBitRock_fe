import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enqueueSnackbar } from 'notistack';

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
        } catch (err) {
          enqueueSnackbar('User with this email already exists', { variant: 'error' });
        }
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
