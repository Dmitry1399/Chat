import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useSetHeaders from "../hooks/useSetHeaders";

export const homeChannelsApi = createApi({
    reducerPath: 'channels',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/channels',
        prepareHeaders: useSetHeaders,
        tagTypes: ['Channels'],
    }),
    endpoints: (builder) => ({
        getChannels: builder.query({
            query: () => '',
            providesTags: ['Channels'],
        }),
        addChannel: builder.mutation({
            query: (newChannel) => ({
              method: 'POST',
              body: newChannel,
              invalidatesTags: ['Channels'],
            }),
          }),
          editChannel: builder.mutation({
            query: ({ id, ...body }) => ({
              url: id,
              method: 'PATCH',
              body,
              invalidatesTags: ['Channels'],
            }),
          }),
          removeChannel: builder.mutation({
            query: ({ id }) => ({
              url: id,
              method: 'DELETE',
              invalidatesTags: ['Channels'],
            }),
          }),
        }),
      });
      
     export const {
        useGetChannelsQuery,
        useAddChannelMutation,
        useEditChannelMutation,
        useRemoveChannelMutation,
     } = homeChannelsApi;