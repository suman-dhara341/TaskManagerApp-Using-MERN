import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        removeToken: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
});

export const { setToken, removeToken, setUser, setLoading } = counterSlice.actions;

export default counterSlice.reducer;
