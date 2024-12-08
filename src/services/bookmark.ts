import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_API_BASE } from '../config/constants';
import { prepareHeaders } from '../utils/apiUtils';

export const bookmarksApi = createApi({
  reducerPath: 'bookmarks',
  baseQuery: fetchBaseQuery({
    baseUrl: APP_API_BASE,
    prepareHeaders, 
  }),
  endpoints: (builder) => ({
    addBookmark: builder.mutation({
      query: (bookmark) => ({
        url: 'bookmarks',
        method: 'POST',
        body: bookmark,
      }),
    }),
    getBookmarks: builder.query({
      query: () => ({
        url: 'bookmarks',
        method: 'GET',
      }),
    }),
    removeBookmark: builder.mutation({
      query: (bookmarkId) => ({
        url: `bookmarks/${bookmarkId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddBookmarkMutation,
  useGetBookmarksQuery,
  useRemoveBookmarkMutation,
} = bookmarksApi;
