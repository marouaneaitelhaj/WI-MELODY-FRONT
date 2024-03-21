import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentForm from './PaymentForm';
import { useEffect } from 'react';
import { getTierById } from '../../state/tier/tierActions';
import { RootState, useAppDispatch } from '../../state/store';
import { Tpayment, Ttier } from '../../state/types';
import { useSelector } from 'react-redux';
import { checkSubscription, createPayment } from '../../state/payment/paymentActions';
import { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';





export default function Payment(props: { tierId: string | undefined }) {

    const { selectedTier } = useSelector((state: RootState) => state.tier)

    const { user } = useSelector((state: RootState) => state.auth)

    const dispatch = useAppDispatch()

    const [open, setOpen] = React.useState(false);

    const [alreadySubscribed, setAlreadySubscribed] = React.useState(false)



    const [confirmation, setConfirmation] = React.useState(false)

    useEffect(() => {
        dispatch(getTierById(props.tierId as string)).unwrap().then((tier) => {
            dispatch(checkSubscription({ tier_id: tier?.id as string })).unwrap().then((res) => {
                console.log(res)
                if (res) {
                    setAlreadySubscribed(res.data)
                } else {
                    setAlreadySubscribed(false)
                }
            })
        })

    }, [])

    const submit = () => {
        // dispatch(createPayment(
        //     {
        //         fan_id: user?.id,
        //         tier_id: tier.id
        //     } as Tpayment
        // ))
        setOpen(true)
    }

    useEffect(() => {
        if (confirmation) {
            dispatch(createPayment(
                {
                    fan_id: user?.id,
                    tier_id: selectedTier?.id
                } as Tpayment
            ))
        }
    }, [confirmation])


    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        // borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                </AppBar>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component={"span"} component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <React.Fragment>
                            <PaymentForm></PaymentForm>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    onClick={submit}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    Done
                                </Button>
                            </Box>
                        </React.Fragment>
                    </Paper>
                </Container>
                <PaymentConfirmation setOpen={setOpen} open={open} setConfirmation={setConfirmation} confirmation={confirmation}></PaymentConfirmation>
            </React.Fragment>
        </>
    );
}


function PaymentConfirmation(props: { setOpen: Dispatch<SetStateAction<boolean>>, open: boolean, setConfirmation: Dispatch<SetStateAction<boolean>>, confirmation: boolean }) {
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
                    Are you sure you want to proceed with the payment?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={
                    () => {
                        props.setConfirmation(true)
                        props.setOpen(false)
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

// add component that say you already have a subscription to this tier
function AlreadySubscribed() {
    return (
        <Dialog
            open={true}
            onClose={() => { }}
            aria-labelledby="parent-dialog-title"
            aria-describedby="parent-dialog-description"
        >
            <DialogTitle id="parent-dialog-title">Already Subscribed</DialogTitle>
            <DialogContent>
                <DialogContentText id="parent-dialog-description">
                    You are already subscribed to this tier
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={
                    () => {

                    }
                } variant="contained" color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}