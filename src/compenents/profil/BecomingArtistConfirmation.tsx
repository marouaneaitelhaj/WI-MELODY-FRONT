import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { RootState, useAppDispatch } from '../../state/store';
import { useSelector } from 'react-redux';

export default function BecomingArtistConfirmation(props: { setOpen: Dispatch<SetStateAction<boolean>>, open: boolean, func: any }) {
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="parent-dialog-title"
            aria-describedby="parent-dialog-description"
        >
            <DialogTitle id="parent-dialog-title">Admin Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText id="parent-dialog-description">
                    Are you sure you want to update this user ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={
                    () => {
                        if (user) {
                            dispatch(props.func());
                            props.setOpen(false);
                        }
                    }
                } variant="contained" color="primary">
                    Confirm
                </Button>
                <Button onClick={
                    () => {
                        props.setOpen(false)
                    }
                } variant="outlined" color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}