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
        setTierForAddTierForm(state, action) {
            state.tier = action.payload;
        },
        setOpenForAddTierForm(state, action) {
            state.open = action.payload;
        }
    }
})

export const { setTierForAddTierForm, setOpenForAddTierForm } = AddTierFormSlice.actions;

export default AddTierFormSlice.reducer;