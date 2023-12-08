// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    // Add other reducers as needed
  },
});

export default store;
