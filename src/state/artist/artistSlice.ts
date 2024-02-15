import { createSlice } from "@reduxjs/toolkit";
import { Tuser } from "../types";
import { getArtists } from "./artistActions";

type ArtistState = {
    artists: Tuser[]
}

const initialState: ArtistState = {
    artists: [] as Tuser[]
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
    }
})
export default artistSlice.reducer