import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: [],
};

export interface  Action {
    payload: {
        index: number;
    }
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state: any, action) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action: Action) => {
            // @ts-ignore
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
    },
});

export const { addToast, removeToast } = toastSlice.actions;
