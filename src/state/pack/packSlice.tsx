import { createSlice } from "@reduxjs/toolkit"
import { Tpack } from "../types"
import { getPackById, getPacks } from "./packActions"

type PackState = {
    packs: Tpack[]
}

const initialState: PackState = {
    packs: [] as Tpack[]
}

const packSlice = createSlice({
    name: 'pack',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getPacks
        builder.addCase(getPacks.pending, (state, action) => {
            state.packs = []
        }).addCase(getPacks.fulfilled, (state, action) => {
            state.packs = action.payload
        }).addCase(getPacks.rejected, (state, action) => {
            state.packs = []
        })
        // getPackById
        // builder.addCase(getPackById.pending, (state, action) => {
        //     state.selectedPack = null
        // }).addCase(getPackById.fulfilled, (state, action) => {
        //     state.selectedPack = action.payload
        // }).addCase(getPackById.rejected, (state, action) => {
        //     state.selectedPack = null
        // })
    }
})

export default packSlice.reducer