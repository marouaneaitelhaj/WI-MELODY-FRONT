import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import artistReducer from './artist/artistSlice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        artist: artistReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()