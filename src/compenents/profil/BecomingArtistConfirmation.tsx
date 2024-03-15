import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { RootState, useAppDispatch } from '../../state/store';
import { saveArtistRequest } from '../../state/artistRequests/artistActions';
import { useSelector } from 'react-redux';
import { TartistRequests } from '../../state/types';

export default function BecomingArtistConfirmation(props: { setOpen: Dispatch<SetStateAction<boolean>>, open: boolean, setConfirmation: Dispatch<SetStateAction<boolean>>, confirmation: boolean }) {
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="parent-dialog-title"
            aria-describedby="parent-dialog-description"
        >
            <DialogTitle id="parent-dialog-title">Confirm Payment</DialogTitle>
            <DialogContent>
                <DialogContentText id="parent-dialog-description">
                    Are you sure you want to become an artist?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={
                    () => {
                        if (user)
                            dispatch(saveArtistRequest({ fan_id: user.id } as TartistRequests))
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