import { createSlice } from "@reduxjs/toolkit"
import { Ttier } from "../types"
import { getTierById, getTiers } from "./tierActions"

type TierState = {
    tiers: Ttier[]
}

const initialState: TierState = {
    tiers: [] as Ttier[]
}

const tierSlice = createSlice({
    name: 'tier',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getTiers
        builder.addCase(getTiers.pending, (state, action) => {
            state.tiers = []
        }).addCase(getTiers.fulfilled, (state, action) => {
            state.tiers = action.payload
        }).addCase(getTiers.rejected, (state, action) => {
            state.tiers = []
        })
        // getTierById
        // builder.addCase(getTierById.pending, (state, action) => {
        //     state.selectedTier = null
        // }).addCase(getTierById.fulfilled, (state, action) => {
        //     state.selectedTier = action.payload
        // }).addCase(getTierById.rejected, (state, action) => {
        //     state.selectedTier = null
        // })
    }
})

export default tierSlice.reducer