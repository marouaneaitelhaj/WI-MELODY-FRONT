import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { closeConfirmationPopUp } from "../../state/confirmationPopUp/confirmationPopUpSlice";
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ConfirmationPopUp() {
    const { title, desciption, open, func } = useSelector((state: RootState) => state.confirmationPopUp);

    const dispatch = useAppDispatch();

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(closeConfirmationPopUp())}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {desciption}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    dispatch(closeConfirmationPopUp())
                }}>Disagree</Button>
                <Button onClick={
                    () => {
                        dispatch(closeConfirmationPopUp())
                        dispatch(func)
                    }
                }>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}