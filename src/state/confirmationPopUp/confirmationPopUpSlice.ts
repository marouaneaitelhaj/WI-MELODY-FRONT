import { createSlice } from "@reduxjs/toolkit"

type ConfirmationPopUpState = {
    title: string | null,
    desciption: string | null,
    open: boolean,
    func: any
}

const initialState: ConfirmationPopUpState = {
    title: null,
    desciption: null,
    open: false,
    func: null
}

const ConfirmationPopUpSlice = createSlice({
    name: 'confirmationPopUp',
    initialState,
    reducers: {
        showConfirmationPopUp(state, action: { payload: ConfirmationPopUpState }) {
            state.title = action.payload.title;
            state.open = true;
            state.desciption = action.payload.desciption;
            state.func = action.payload.func;
        },
        closeConfirmationPopUp(state) {
            state.title = null;
            state.open = false;
            state.desciption = null;
            state.func = null;
        }
    }
})

export const { closeConfirmationPopUp, showConfirmationPopUp } = ConfirmationPopUpSlice.actions;

export default ConfirmationPopUpSlice.reducer;