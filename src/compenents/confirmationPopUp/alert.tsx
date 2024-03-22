import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert/Alert';
import { RootState, useAppDispatch } from '../../state/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeAlertPopUp } from '../../state/confirmationPopUp/AlertSlice';

export default function MyAlert() {
    const { open, title, severity } = useSelector((state: RootState) => state.AlertPopUp);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                dispatch(closeAlertPopUp());
            }, 5000)
        }
    }, [open])

    return (
        <Slide direction="up" in={open} style={{
            transitionDelay: '500ms',
        }} mountOnEnter unmountOnExit>
            <Alert
                style={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    margin: '1rem',
                }}
                severity={severity}
            >
                {title}
            </Alert>
        </Slide>
    )
}