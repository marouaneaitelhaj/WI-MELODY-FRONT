import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Ttier } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import AxiosInstanceForAuth from "../../axios/AxiosInstanceForAuth";

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
        return data as Ttier;
    }
);

// Create Tier
export const createTier = createAsyncThunk<Ttier, Ttier>(
    'tiers/createTier',
    async (formData) => {
        const { data } = await AxiosInstanceForMyApi.post('/tier', formData);
        return data.data as Ttier;
    }
);

// Update Tier
export const updateTier = createAsyncThunk<Ttier, { id: string; formData: FormData }>(
    'tiers/updateTier',
    async ({ id, formData }) => {
        const { data } = await AxiosInstanceForMyApi.put(`/tier/${id}`, formData);
        return data;
    }
);

// Delete Tier
export const deleteTier = createAsyncThunk<string, string>(
    'tiers/deleteTier',
    async (id) => {
        await AxiosInstanceForMyApi.delete(`/tier/${id}`);
        return id
    }
);
