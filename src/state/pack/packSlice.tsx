import { createSlice } from "@reduxjs/toolkit"
import { Tpack } from "../types"
import { createPack, deletePack, getPackById, getPacks, updatePack } from "./packActions"

type PackState = {
    packs: Tpack[];
    selectedPack: Tpack | null;
    loading: boolean;
    error: string | null;
};

const initialState: PackState = {
    packs: [],
    selectedPack: null,
    loading: false,
    error: null,
};

const packSlice = createSlice({
    name: 'pack',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getPacks
        builder.addCase(getPacks.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getPacks.fulfilled, (state, action) => {
            state.loading = false;
            state.packs = action.payload;
        }).addCase(getPacks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch packs';
        });

        // getPackById
        builder.addCase(getPackById.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getPackById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedPack = action.payload;
        }).addCase(getPackById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch pack';
        });

        // createPack
        builder.addCase(createPack.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createPack.fulfilled, (state, action) => {
            state.loading = false;
            state.packs = [...state.packs, action.payload];
        }).addCase(createPack.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create pack';
        });

        // updatePack
        builder.addCase(updatePack.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updatePack.fulfilled, (state, action) => {
            state.loading = false;
            state.packs = state.packs.map(pack => pack.id === action.payload.id ? action.payload : pack);
        }).addCase(updatePack.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update pack';
        });

        // deletePack
        builder.addCase(deletePack.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deletePack.fulfilled, (state, action) => {
            state.loading = false;
            state.packs = state.packs.filter(pack => pack.id !== action.payload);
        }).addCase(deletePack.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete pack';
        });
    }
})

export default packSlice.reducer