import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppRoute } from 'enums';

export const VerificationApi = createApi({
  reducerPath: 'verificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Verification'],
  endpoints: (builder) => ({
    createVerification: builder.mutation({
      query: (body) => {
        return {
          url: AppRoute.ADD_VERIFICATION_DATA,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useCreateVerificationMutation } = VerificationApi;
