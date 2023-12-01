import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute, StorageKey } from 'enums';
import { GetUserRequest, GetUserResponse } from 'types/user-data';

export const GetUserApi = createApi({
  reducerPath: 'getUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(StorageKey.TOKEN);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Get user by id'],
  endpoints: (builder) => ({
    getUserById: builder.mutation<GetUserResponse['data'], GetUserRequest>({
      query: (body) => ({
        url: ApiRoute.GET_USER_BY_ID,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetUserByIdMutation } = GetUserApi;
