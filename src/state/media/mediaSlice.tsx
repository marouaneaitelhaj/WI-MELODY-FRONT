import { createSlice } from "@reduxjs/toolkit"
import { Tmedia } from "../types"
import { getMediaById, getMedias } from "./mediaActions"

type MediaState = {
    medias: Tmedia[]
}

const initialState: MediaState = {
    medias: [] as Tmedia[]
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getMedias
        builder.addCase(getMedias.pending, (state, action) => {
            state.medias = []
        }).addCase(getMedias.fulfilled, (state, action) => {
            state.medias = action.payload
        }).addCase(getMedias.rejected, (state, action) => {
            state.medias = []
        })
        // getMediaById
        // builder.addCase(getMediaById.pending, (state, action) => {
        //     state.selectedMedia = null
        // }).addCase(getMediaById.fulfilled, (state, action) => {
        //     state.selectedMedia = action.payload
        // }).addCase(getMediaById.rejected, (state, action) => {
        //     state.selectedMedia = null
        // })
    }
})

export default mediaSlice.reducer