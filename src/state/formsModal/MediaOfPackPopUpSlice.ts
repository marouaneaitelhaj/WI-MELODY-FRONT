import { createSlice } from "@reduxjs/toolkit"
import { Tpack } from "../types"

type MediaOfPackPopUpState = {
    pack: Tpack | null,
    open: boolean
}

const initialState: MediaOfPackPopUpState = {
    pack: null,
    open: false
}

const MediaOfPackPopUpSlice = createSlice({
    name: 'mediaOfPackPopUp',
    initialState,
    reducers: {
        setPackForMediaOfPackPopUp(state, action) {
            state.pack = action.payload;
        },
        setOpenForMediaOfPackPopUp(state, action) {
            state.open = action.payload;
        }
    }
})

export const { setPackForMediaOfPackPopUp, setOpenForMediaOfPackPopUp } = MediaOfPackPopUpSlice.actions;
export default MediaOfPackPopUpSlice.reducer;