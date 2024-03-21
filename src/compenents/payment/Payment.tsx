import * as React from 'react';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { getTierById } from '../../state/tier/tierActions';
import { RootState, useAppDispatch } from '../../state/store';
import { Tpayment } from '../../state/types';
import { useSelector } from 'react-redux';
import { checkSubscription, createPayment } from '../../state/payment/paymentActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import { showConfirmationPopUp } from '../../state/confirmationPopUp/confirmationPopUpSlice';
import { useNavigate } from 'react-router-dom';




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Payment(props: { tierId: string | undefined }) {

    const { selectedTier } = useSelector((state: RootState) => state.tier)

    const { user } = useSelector((state: RootState) => state.auth)

    const { open } = useSelector((state: RootState) => state.confirmationPopUp)

    const dispatch = useAppDispatch()

    const navigate = useNavigate();


    const [paymentDetails, setPaymentDetails] = React.useState({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const [isopen, setOpen] = React.useState(true);



    useEffect(() => {
        dispatch(getTierById(props.tierId as string)).unwrap().then((tier) => {
            dispatch(checkSubscription({ tier_id: tier?.id as string })).unwrap().then((res) => {
                console.log(res)
                if (res) {
                    navigate(-1)
                } else {
                }
            })
        })
    }, [open])

    const submit = () => {
        setOpen(false)
        dispatch(showConfirmationPopUp({
            desciption: 'Are you sure you want to subscribe to this tier?',
            func: () => dispatch(createPayment(
                {
                    fan_id: user?.id,
                    tier_id: selectedTier?.id
                } as Tpayment
            )),
            title: 'Confirm Subscription',
            open: true
        }))
    }




    return (
        <Dialog open={isopen} TransitionComponent={Transition}>
            <DialogTitle>Checkout Payment</DialogTitle>
            <DialogContent>
                <form className="space-y-4 my-2">
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="name" className="text-sm font-medium">Name on Card:</label>
                        <input
                            id="name"
                            placeholder="John Doe"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            value={paymentDetails.name}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="cardNumber" className="text-sm font-medium">Card Number:</label>
                        <input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="expirationDate" className="text-sm font-medium">Expiration Date:</label>
                        <input
                            id="expirationDate"
                            placeholder="MM/YY"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            value={paymentDetails.expirationDate}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, expirationDate: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="cvv" className="text-sm font-medium">CVV:</label>
                        <input
                            id="cvv"
                            placeholder="123"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                        />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                //   onClick={ }
                >Cancel</Button>
                <Button
                    onClick={
                        submit
                    }
                    color="primary">Pay Now</Button>
            </DialogActions>
        </Dialog>
    );

}