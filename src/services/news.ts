import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
  }),
  endpoints: (builder) => ({
    getEverything: builder.query({
      query: ({ keyword, page = 1 }) => ({
        url: `everything`,
        params: {
          q: keyword,
          page,
          pageSize: 18,
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
        },
      }),
    }),
    getLatestNews: builder.query({
      query: (page) => ({
        url: "top-headlines",
        params: { page, pageSize: 10, country: "us", apiKey: process.env.REACT_APP_NEWS_API_KEY, }, 
      }),
    }),
  }),
});

export const { useGetEverythingQuery, useGetLatestNewsQuery } = newsApi;
