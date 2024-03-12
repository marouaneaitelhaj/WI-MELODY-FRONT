import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import artistReducer from './artist/artistSlice';
import mediaReducer from './media/mediaSlice';
import packReducer from './pack/packSlice';
import uploadsReducer from './mycdn/cdnSlice';
import tierReducer from './tier/tierSlice';
import { useDispatch } from 'react-redux';
import artistRequestsReducer from './artistRequests/artistRequestsSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        artist: artistReducer,
        media: mediaReducer,
        pack: packReducer,
        tier: tierReducer,
        uploads: uploadsReducer,
        artistRequests: artistRequestsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()