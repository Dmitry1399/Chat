import { configureStore } from "@reduxjs/toolkit";
import { authenticateApi } from "../api/authenticateApi.js";
import { homeChannelsApi } from "../api/homeChannelsApi.js";
import { homeMessagessApi } from "../api/homeMessagesApi.js";
import authReducer from './slices/auth.js';
import appReducer from "./slices/app.js";

export default configureStore({
    reducer: {
        authentication: authenticateApi.reducer,
        messages: homeMessagessApi.reducer,
        channels: homeChannelsApi.reducer,
        auth: authReducer,
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authenticateApi.middleware, homeChannelsApi.middleware, homeMessagessApi.middleware),
});