import { createSlice } from "@reduxjs/toolkit"
import { Tpack } from "../types"

type AddPackFormState = {
    pack: Tpack | null,
    open: boolean
}

const initialState: AddPackFormState = {
    pack: null,
    open: false
}

const AddPackFormSlice = createSlice({
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

export const { setPack, setOpen } = AddPackFormSlice.actions;
export default AddPackFormSlice.reducer;