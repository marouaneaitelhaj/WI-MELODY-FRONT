import { createSlice } from "@reduxjs/toolkit";
import { TartistRequests } from "../types";
import { approveArtistRequest, getArtistRequests, rejectArtistRequest, saveArtistRequest } from "./artistActions";

interface ArtistRequestsState {
    artistRequests: TartistRequests[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ArtistRequestsState = {
    artistRequests: [],
    status: 'idle',
    error: null,
};

const artistRequestsSlice = createSlice({
    name: 'artistRequests',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveArtistRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveArtistRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artistRequests.push(action.payload);
            })
            .addCase(saveArtistRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(rejectArtistRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(rejectArtistRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artistRequests = state.artistRequests.map((artistRequest) => {
                    if (artistRequest.id === action.payload.id) {
                        return action.payload;
                    }
                    return artistRequest;
                });
            })
            .addCase(getArtistRequests.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getArtistRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artistRequests = action.payload;
            })
            .addCase(getArtistRequests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(approveArtistRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(approveArtistRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artistRequests = state.artistRequests.map((artistRequest) => {
                    if (artistRequest.id === action.payload.id) {
                        return action.payload;
                    }
                    return artistRequest;
                });
            })
            .addCase(approveArtistRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });

        // Similar handling for other actions
    },
});

export default artistRequestsSlice.reducer;