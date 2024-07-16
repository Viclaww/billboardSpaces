import { configureStore } from "@reduxjs/toolkit";
// import { appApi } from "./apiSlices/api";
import userSlice from "./dataSlices/user.slice";
import { generalApiSlice } from "./api/baseApiSlice";
export const store = configureStore({
    reducer: {
       user: userSlice,
       [generalApiSlice.reducerPath]: generalApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(generalApiSlice.middleware),
    devTools: true
});