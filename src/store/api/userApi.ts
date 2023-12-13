import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiRoute, StorageKey } from 'enums';
import { IUserUpdateProfile } from 'types/user';
import {
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserResponse,
} from 'types/user-data';

export const UserApi = createApi({
  reducerPath: 'userApi',
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
    updateUser: builder.mutation<UpdateUserResponse['data'], IUserUpdateProfile>({
      query: (body) => ({
        url: ApiRoute.UPDATE_PROFILE_DATA,
        method: 'PATCH',
        body,
      }),
    }),
    setAvatar: builder.mutation<UpdateUserResponse['data'], FormData>({
      query: (body) => ({
        url: ApiRoute.SET_AVATAR,
        method: 'PATCH',
        body,
      }),
    }),
    deleteAvatar: builder.mutation<UpdateUserResponse['data'], { userId: string }>({
      query: (body) => ({
        url: ApiRoute.DELETE_AVATAR,
        method: 'PATCH',
        body,
      }),
    }),
    deleteUser: builder.mutation<DeleteUserResponse['data'], { id: string }>({
      query: ({ id }) => ({
        url: ApiRoute.DELETE_USER,
        method: 'DELETE',
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetUserByIdMutation,
  useUpdateUserMutation,
  useSetAvatarMutation,
  useDeleteUserMutation,
  useDeleteAvatarMutation,
} = UserApi;
