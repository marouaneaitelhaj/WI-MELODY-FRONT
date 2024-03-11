import { createSlice } from "@reduxjs/toolkit";
import { Ttier } from "../types";
import { getTierById, getTiers, createTier, updateTier, deleteTier } from "./tierActions";

type TierState = {
    tiers: Ttier[];
    selectedTier: Ttier | null; // Add selectedTier state
    loading: boolean;
    error: string | null;
};

const initialState: TierState = {
    tiers: [],
    selectedTier: null,
    loading: false,
    error: null,
};

const tierSlice = createSlice({
    name: 'tier',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getTiers
        builder.addCase(getTiers.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getTiers.fulfilled, (state, action) => {
            state.loading = false;
            state.tiers = action.payload;
        }).addCase(getTiers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch tiers';
        });

        // getTierById
        builder.addCase(getTierById.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getTierById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedTier = action.payload;
        }).addCase(getTierById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch tier by ID';
        });

        // createTier
        builder.addCase(createTier.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createTier.fulfilled, (state, action) => {
            state.loading = false;
            state.tiers = [...state.tiers, action.payload];
        }).addCase(createTier.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create tier';
        });

        // updateTier
        builder.addCase(updateTier.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateTier.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.tiers.findIndex(tier => tier.id === action.payload.id);
            if (index !== -1) {
                state.tiers[index] = action.payload;
            }
        }).addCase(updateTier.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update tier';
        });

        // deleteTier
        builder.addCase(deleteTier.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deleteTier.fulfilled, (state, action) => {
            state.loading = false;
            state.tiers = state.tiers.filter(tier => tier.id !== action.payload);
        }).addCase(deleteTier.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete tier';
        });
    }
});

export default tierSlice.reducer;
