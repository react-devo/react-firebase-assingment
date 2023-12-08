// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetail: {}
    },
    reducers: {
        setUser: (state, action) => {
            return { ...state, userDetail: action.payload };
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
