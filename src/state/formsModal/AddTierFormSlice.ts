import { createSlice } from "@reduxjs/toolkit"
import { Ttier } from "../types"

type AddTierFormState = {
    tier: Ttier | null,
    open: boolean
}

const initialState: AddTierFormState = {
    tier: null,
    open: false
}

const AddTierFormSlice = createSlice({
    name: 'addTierForm',
    initialState,
    reducers: {
        setTier(state, action) {
            state.tier = action.payload;
        },
        setOpen(state, action) {
            state.open = action.payload;
        }
    }
})

// export const { setTier, setOpen } = AddTierFormSlice.actions;

// export default AddTierFormSlice.reducer;