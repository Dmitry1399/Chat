import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useSetHeaders from "../hooks/useSetHeaders";

export const homeMessagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/messages',
        prepareHeaders: useSetHeaders,
    }),
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => '',
        }),
    }),
});

export const { useGetMessagesQuery } = homeMessagesApi;