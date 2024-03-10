import { createSlice } from "@reduxjs/toolkit";
import { uploadAudio, uploadImage } from "./cdnActions";

type UploadState = {
    audioUrl: string | null;
    imageUrl: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: UploadState = {
    audioUrl: null,
    imageUrl: null,
    loading: false,
    error: null,
};

const uploadSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(uploadAudio.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(uploadAudio.fulfilled, (state, action) => {
            state.loading = false;
            state.audioUrl = action.payload;
        }).addCase(uploadAudio.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to upload audio';
        });

        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(uploadImage.fulfilled, (state, action) => {
            state.loading = false;
            state.imageUrl = action.payload;
        }).addCase(uploadImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to upload image';
        });
    }
});

export const { clearError } = uploadSlice.actions;

export default uploadSlice.reducer;
