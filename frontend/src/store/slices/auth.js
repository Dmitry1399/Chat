/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') ?? null,
    username: localStorage.getItem('username') ?? null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { token, username } = action.payload;
            
            state.token = token;
            state.username = username;
        },
    },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;