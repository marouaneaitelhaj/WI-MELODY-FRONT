import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Tpayment } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Fetching all payments
export const getPayments = createAsyncThunk<Tpayment[]>(
    'payments/getPayments',
    async () => {
        const { data } = await AxiosInstanceForMyApi.get('/payment');
        return data;
    }
);

// Fetching a single payment by ID
export const getPaymentById = createAsyncThunk<Tpayment, Tpayment>(
    'payments/getPaymentById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/payment/${id}`);
        return data;
    }
);

// Creating a new payment
export const createPayment = createAsyncThunk<Tpayment, Tpayment>(
    'payments/createPayment',
    async (newPayment) => {
        const { data } = await AxiosInstanceForMyApi.post('/payment', newPayment);
        return data.data as Tpayment;
    }
);

// Updating an existing payment
export const updatePayment = createAsyncThunk<Tpayment, { id: string, updatedPayment: Partial<Tpayment> }>(
    'payments/updatePayment',
    async ({ id, updatedPayment }) => {
        const { data } = await AxiosInstanceForMyApi.put(`/payment/${id}`, updatedPayment);
        return data;
    }
);

// Deleting an existing payment
export const deletePayment = createAsyncThunk<string, string>(
    'payments/deletePayment',
    async (id) => {
        await AxiosInstanceForMyApi.delete(`/payment/${id}`);
        return id;
    }
);
