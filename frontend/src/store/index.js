import { configureStore } from "@reduxjs/toolkit";
import { authenticateApi } from "../Api/autheticateApi.js";
import authReducer from './slices/auth.js';

export default configureStore({
    reducer: {
        authentication: authenticateApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authenticateApi.middleware),
});