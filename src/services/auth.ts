import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {APP_API_BASE} from "../config/constants";


export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery(
        {baseUrl: APP_API_BASE}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: 'auth/register',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: 'auth/login',
                method: 'POST',
                body: user,
            }),
        }),
        activateAccount: builder.mutation({
            query: (token) => ({
                url: 'auth/activate/' + token,
                method: 'GET',
            }),
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: email,
            }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body: body,
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useActivateAccountMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;
