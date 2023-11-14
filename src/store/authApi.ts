import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUserData {
  email: string;
  password: string;
}

interface IUserDataResponse {
  user: {
    email: string;
    password?: string;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    register: build.mutation<IUserDataResponse, IUserData>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const { useRegisterMutation } = authApi;
