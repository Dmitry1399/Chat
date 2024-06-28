import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useSetHeaders from '../hooks/useSetHeaders';

export const authenticateApi = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: useSetHeaders,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    signUp: builder.mutation({
      query: (newUserData) => ({
        url: 'signup',
        method: 'POST',
        body: newUserData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authenticateApi;
