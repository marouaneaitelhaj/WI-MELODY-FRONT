import { createSlice } from "@reduxjs/toolkit";
import { uploadAudio, uploadImage } from "./cdnActions";
import { Tmedia } from "../types";

type UploadState = {
    audios: Tmedia[];
    imageUrl: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: UploadState = {
    audios: [],
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
        clearAudio: (state) => {
            state.audios = [];
        },
        removeAudio : (state, action) => {
            state.audios = state.audios.filter(audio => audio.src !== action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(uploadAudio.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(uploadAudio.fulfilled, (state, action) => {
            state.loading = false;
            state.audios.push(action.payload);
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

export const { clearError, clearAudio, removeAudio } = uploadSlice.actions;

export default uploadSlice.reducer;
