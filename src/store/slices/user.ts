import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 1,
    first_name: "",
    last_name: "",
    email: "",
    access_token: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.access_token = action.payload.access_token;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.id = 0;
            state.first_name = '';
            state.last_name = '';
            state.email = '';
            state.access_token = null;
        },
    }
});

export const { setUser, logout } = userSlice.actions;
