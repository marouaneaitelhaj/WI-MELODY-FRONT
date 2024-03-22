import { createSlice } from "@reduxjs/toolkit"

type AlertPopUpState = {
    title: string | null,
    open: boolean,
    severity?: "success" | "error" | "info" | "warning"
}

const initialState: AlertPopUpState = {
    title: null,
    open: false,
    severity: "success"
}

const AlertPopUpSlice = createSlice({
    name: 'AlertPopUp',
    initialState,
    reducers: {
        showAlertPopUp(state, action: { payload: AlertPopUpState }) {
            state.title = action.payload.title;
            state.open = true;
            state.severity = action.payload.severity || "success";
        },
        closeAlertPopUp(state) {
            state.title = null;
            state.open = false;
            state.severity = "success";
        }
    }
})

export const { closeAlertPopUp, showAlertPopUp } = AlertPopUpSlice.actions;

export default AlertPopUpSlice.reducer;