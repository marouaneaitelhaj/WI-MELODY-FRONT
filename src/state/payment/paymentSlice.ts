import { createSlice } from "@reduxjs/toolkit"
import { Tpayment } from "../types"
import { createPayment, deletePayment, getPaymentById, getPayments, updatePayment } from "./paymentActions"

type PaymentState = {
    payments: Tpayment[];
    selectedPayment: Tpayment | null;
    loading: boolean;
    error: string | null;
};

const initialState: PaymentState = {
    payments: [],
    selectedPayment: null,
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getPayments
        builder.addCase(getPayments.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload;
        }).addCase(getPayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch payments';
        });

        // getPaymentById
        builder.addCase(getPaymentById.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getPaymentById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedPayment = action.payload;
        }).addCase(getPaymentById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch payment';
        });

        // createPayment
        builder.addCase(createPayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = [...state.payments, action.payload];
        }).addCase(createPayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create payment';
        });

        // updatePayment
        builder.addCase(updatePayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updatePayment.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.payments.findIndex(payment => payment.id === action.payload.id);
            if (index !== -1) {
                state.payments[index] = action.payload;
            }
        }).addCase(updatePayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update payment';
        });

        // deletePayment
        builder.addCase(deletePayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deletePayment.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = state.payments.filter(payment => payment.id !== action.payload);
        }).addCase(deletePayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete payment';
        });
    }
})

export default paymentSlice.reducer