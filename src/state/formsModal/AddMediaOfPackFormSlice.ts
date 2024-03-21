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
    name: 'addMediaOfPackForm',
    initialState,
    reducers: {
        setPackForAddMediaToPack(state, action) {
            state.pack = action.payload;
        },
        setOpenForAddMediaToPack(state, action) {
            state.open = action.payload;
        }
    }
})

export const { setPackForAddMediaToPack, setOpenForAddMediaToPack } = AddMediaOfPackFormSlice.actions;
export default AddMediaOfPackFormSlice.reducer;