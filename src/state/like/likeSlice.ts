import { createSlice } from "@reduxjs/toolkit"
import { Tlike } from "../types"
import { createLike, deleteLike, getLikeById, getLikes, getLikesByArtistId, updateLike } from "./likeActions"

type LikeState = {
    likes: Tlike[];
    selectedLike: Tlike | null;
    loading: boolean;
    error: string | null;
};

const initialState: LikeState = {
    likes: [],
    selectedLike: null,
    loading: false,
    error: null,
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        // getLikes
        builder.addCase(getLikes.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getLikes.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = action.payload;
        }).addCase(getLikes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch likes';
        });

        // getLikeById
        builder.addCase(getLikeById.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getLikeById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedLike = action.payload;
        }).addCase(getLikeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch like';
        });

        // createLike
        builder.addCase(createLike.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createLike.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = [...state.likes, action.payload];
        }).addCase(createLike.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create like';
        });

        // updateLike
        builder.addCase(updateLike.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateLike.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.likes.findIndex(like => like.id === action.payload.id);
            if (index !== -1) {
                state.likes[index] = action.payload;
            }
        }).addCase(updateLike.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update like';
        });

        // deleteLike
        builder.addCase(deleteLike.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deleteLike.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = state.likes.filter(like => like.id !== action.payload);
        }).addCase(deleteLike.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete like';
        });
        //
        builder.addCase(getLikesByArtistId.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getLikesByArtistId.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = action.payload;
        }).addCase(getLikesByArtistId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch likes';
        });
    }
})

export default likeSlice.reducer