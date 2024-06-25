import { configureStore } from "@reduxjs/toolkit";
import { authenticateApi } from "../Api/autheticateApi.js";
import { homeChannelsApi } from "../Api/homeChannelsApi.js";
import { homeMessagesApi } from "../Api/homeMessagesApi.js";
import authReducer from './slices/auth.js';
import appReducer from "./slices/app.js";

export default configureStore({
    reducer: {
        authentication: authenticateApi.reducer,
        messages: homeMessagesApi.reducer,
        channels: homeChannelsApi.reducer,
        auth: authReducer,
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authenticateApi.middleware, homeChannelsApi.middleware, homeMessagesApi.middleware),
});