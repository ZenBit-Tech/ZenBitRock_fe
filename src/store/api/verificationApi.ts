import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRoute } from 'enums';
import { UpdateUserResponse } from 'types/user-data';

export const VerificationApi = createApi({
  reducerPath: 'verificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Verification'],
  endpoints: (builder) => ({
    createVerification: builder.mutation<UpdateUserResponse['data'], FormData>({
      query: (body) => ({
        url: ApiRoute.ADD_VERIFICATION_DATA,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useCreateVerificationMutation } = VerificationApi;
