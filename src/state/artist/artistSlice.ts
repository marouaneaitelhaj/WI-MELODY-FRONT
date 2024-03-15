import { createSlice } from "@reduxjs/toolkit";
import { Tuser } from "../types";
import { getArtistById, getArtists } from "./artistActions";

type ArtistState = {
    artists: Tuser[],
    selectedArtist: Tuser | null,
    currentPage: number,
    totalPages: number,
    loading: boolean
}

const initialState: ArtistState = {
    artists: [] as Tuser[],
    selectedArtist: null,
    currentPage: 0,
    totalPages: 0,
    loading: false
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        }
    },
    extraReducers(builder) {
        // getArtists
        builder.addCase(getArtists.pending, (state, action) => {
            state.loading = true;
        }).addCase(getArtists.fulfilled, (state, action) => {
            state.loading = false;
            state.artists = action.payload.content;
            state.totalPages = action.payload.totalPages;
        }).addCase(getArtists.rejected, (state, action) => {
            state.loading = false;
            state.artists = [];
        })
        // getArtistById
        builder.addCase(getArtistById.pending, (state, action) => {
            state.selectedArtist = null
        }).addCase(getArtistById.fulfilled, (state, action) => {
            state.selectedArtist = action.payload
        }).addCase(getArtistById.rejected, (state, action) => {
            state.selectedArtist = null
        })
    }
})

export const { setCurrentPage } = artistSlice.actions;

export default artistSlice.reducer;
