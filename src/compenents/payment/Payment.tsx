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
import { createPayment } from '../../state/payment/paymentActions';




export default function Payment(props: { tierId: string | undefined }) {

    const [tier, setTier] = React.useState<Ttier>({} as Ttier)

    const { user } = useSelector((state: RootState) => state.auth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTierById(props.tierId as string)).then((res) => {
            setTier(res.payload as Ttier)
        })
    }, [])

    const submit = () => {
        dispatch(createPayment(
            {
                fan_id: user?.id,
                tier_id: tier.id
            } as Tpayment
        ))
    }


    return (
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
                    <Typography component="h1" variant="h4" align="center">
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
        </React.Fragment>
    );
}