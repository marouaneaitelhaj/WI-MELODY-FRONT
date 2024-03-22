import { createSlice } from "@reduxjs/toolkit";
import { Tmedia } from "../types";
import { getMediaById, getMedias, getMediasByPack, createMedia, updateMedia, deleteMedia } from "./mediaActions";

type MediaState = {
    medias: Tmedia[];
    selectedMedia: Tmedia | null;
    loading: boolean;
    error: string | null;
};

const initialState: MediaState = {
    medias: [],
    selectedMedia: null,
    loading: false,
    error: null,
};

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getMedias
        builder.addCase(getMedias.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getMedias.fulfilled, (state, action) => {
            state.loading = false;
            state.medias = action.payload;
        }).addCase(getMedias.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch medias';
        });

        // getMediaById
        builder.addCase(getMediaById.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getMediaById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedMedia = action.payload;
        }).addCase(getMediaById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch media by ID';
        });

        // createMedia
        builder.addCase(createMedia.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createMedia.fulfilled, (state, action) => {
            state.loading = false;
            state.medias = [...state.medias, ...action.payload]
        }).addCase(createMedia.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create media';
        });

        // updateMedia
        builder.addCase(updateMedia.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateMedia.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.medias.findIndex(media => media.id === action.payload.id);
            if (index !== -1) {
                state.medias[index] = action.payload;
            }
        }).addCase(updateMedia.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update media';
        });

        // deleteMedia
        builder.addCase(deleteMedia.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deleteMedia.fulfilled, (state, action) => {
            state.loading = false;
            state.medias = state.medias.filter(media => media.id !== action.payload);
        }).addCase(deleteMedia.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete media';
        });

        // getMediasByPack
        builder.addCase(getMediasByPack.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getMediasByPack.fulfilled, (state, action) => {
            state.loading = false;
            state.medias = action.payload;
        }).addCase(getMediasByPack.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch medias by pack';
        });
    }
});

export default mediaSlice.reducer;
