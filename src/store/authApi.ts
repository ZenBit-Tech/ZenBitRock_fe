import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUserData {
  email: string;
  password: string;
}

interface ILoginUserDataResponse {
  user: {
    email: string;
    password?: string;
    id: number;
  };
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3300/api/v1/auth/login' }),
  endpoints: (build) => ({
    signIn: build.mutation<ILoginUserDataResponse, IUserData>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const { useSignInMutation } = authApi;
