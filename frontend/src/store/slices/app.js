/* eslint no-param-reassign: "error" */

import { createSlice } from "@reduxjs/toolkit";

const defaultChannelName = 'general';

const initialState = {
    currentChannel: defaultChannelName,
    currentChannelId: '1',
    channelNames: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setChannels: (state, { payload: channelNames }) => {
            state.channelNames = [...channelNames];
        },
    },
});

export const { setChannels } = appSlice.actions;

export default appSlice.reducer;