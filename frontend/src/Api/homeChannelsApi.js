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
    }),
});

export const { useGetChannelsQuery } = homeChannelsApi;