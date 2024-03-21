import { createSlice } from "@reduxjs/toolkit"
import { Tpack } from "../types"

type AddMediaOfPackFormState = {
    pack: Tpack | null,
    open: boolean
}

const initialState: AddMediaOfPackFormState = {
    pack: null,
    open: false
}

const AddMediaOfPackFormSlice = createSlice({
    name: 'addPackForm',
    initialState,
    reducers: {
        setPack(state, action) {
            state.pack = action.payload;
        },
        setOpen(state, action) {
            state.open = action.payload;
        }
    }
})

export const { setPack, setOpen } = AddMediaOfPackFormSlice.actions;
export default AddMediaOfPackFormSlice.reducer;