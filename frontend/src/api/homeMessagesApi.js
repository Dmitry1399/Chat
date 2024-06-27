import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useSetHeaders from '../hooks/useSetHeaders';

export const homeMessagessApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: useSetHeaders,
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: (id, editedMessage) => ({
        url: id,
        method: 'POST',
        body: editedMessage,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = homeMessagessApi;