import {authApi} from "../services/auth";
import {setupListeners} from "@reduxjs/toolkit/query";
import {newsApi} from "../services/news";
import {logout, userSlice} from "./slices/user";
import { searchSlice } from './slices/searchSlice';
import { bannerSlice } from './slices/bannerSlice';
import { bookmarksApi } from '../services/bookmark';
import { Middleware, configureStore } from "@reduxjs/toolkit";

const unauthorizedMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    if (action.payload?.data?.statusCode === 401) {
      storeAPI.dispatch(logout());
    }
    return next(action);
  };
  

  export const store = configureStore({
    reducer: {
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
});
  
  
  setupListeners(store.dispatch);
  
  export type AppState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  