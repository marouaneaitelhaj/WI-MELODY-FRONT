import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ttier } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import { showAlertPopUp } from "../confirmationPopUp/AlertSlice";

// Get Tiers
export const getTiers = createAsyncThunk<Ttier[]>(
    'tiers/getTiers',
    async () => {
        const { data } = await AxiosInstanceForMyApi.get('/tier');
        return data;
    }
);

// Get Tier By Id
export const getTierById = createAsyncThunk<Ttier, string>(
    'tiers/getTierById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/tier/${id}`);
        return data;
    }
);

// Create Tier
export const createTier = createAsyncThunk<Ttier, Ttier>(
    'tiers/createTier',
    async (formData, api) => {
        const { data } = await AxiosInstanceForMyApi.post('/tier', formData);
        api.dispatch(showAlertPopUp({ title: 'Tier created successfully', severity: 'success', open: true }));
        return data.data as Ttier;
    }
);

// Update Tier
export const updateTier = createAsyncThunk<Ttier, { id: string; tier: Ttier }>(
    'tiers/updateTier',
    async ({ id, tier }, a) => {
        const { data } = await AxiosInstanceForMyApi.put(`/tier/${id}`, tier);
        a.dispatch(showAlertPopUp({ title: 'Tier updated successfully', severity: 'success', open: true }));
        return data;
    }
);

// Delete Tier
export const deleteTier = createAsyncThunk<string, string>(
    'tiers/deleteTier',
    async (id, a) => {
        const { data } = await AxiosInstanceForMyApi.delete(`/tier/${id}`);
        a.dispatch(showAlertPopUp({ title: 'Tier deleted successfully', severity: 'error', open: true }));
        return id
    }
);
