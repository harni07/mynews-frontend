import { configureStore } from '@reduxjs/toolkit'
import {toastSlice} from "./slices/toast";
import {authApi} from "../services/auth";
import {setupListeners} from "@reduxjs/toolkit/query";
import {newsApi} from "../services/news";
import {logout, userSlice} from "./slices/user";
import { searchSlice } from './slices/searchSlice';
import { bannerSlice } from './slices/bannerSlice';
import { bookmarksApi } from '../services/bookmark';

const unauthorizedMiddleware = (storeAPI: any) => (next: any) => (action:any) => {
    if (action.payload?.data?.statusCode && action.payload?.data.statusCode === 401) {
        storeAPI.dispatch(logout());
    }
    return next(action);
};


export const store = configureStore({
    reducer: {
        toast: toastSlice.reducer,
        user: userSlice.reducer,
        search: searchSlice.reducer,
        banner: bannerSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [bookmarksApi.reducerPath]: bookmarksApi.reducer,
        

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            newsApi.middleware,
            bookmarksApi.middleware,
            
            unauthorizedMiddleware
        ),
})

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
