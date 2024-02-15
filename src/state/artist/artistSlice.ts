import { createSlice } from "@reduxjs/toolkit";
import { Tuser } from "../types";
import { getArtistById, getArtists } from "./artistActions";

type ArtistState = {
    artists: Tuser[],
    selectedArtist: Tuser | null
}

const initialState: ArtistState = {
    artists: [] as Tuser[],
    selectedArtist: null
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getArtists
        builder.addCase(getArtists.pending, (state, action) => {
            state.artists = []
        }).addCase(getArtists.fulfilled, (state, action) => {
            state.artists = action.payload
        }).addCase(getArtists.rejected, (state, action) => {
            state.artists = []
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

export default artistSlice.reducer