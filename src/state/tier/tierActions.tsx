import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Ttier } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Get Tiers
export const getTiers = createAsyncThunk<Ttier[]>(
    'tiers/getTiers',
    async () => {
            const { data } = await AxiosInstanceForMyApi.get('/tiers');
            return data;
    }
);

// Get Tier By Id
export const getTierById = createAsyncThunk<Ttier, string>(
    'tiers/getTierById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/tiers/${id}`);
        return data;
    }
);

// Create Tier
export const createTier = createAsyncThunk<Ttier, Ttier>(
    'tiers/createTier',
    async (formData) => {
        const { data } = await AxiosInstanceForMyApi.post('/tiers', formData);
        return data;
    }
);

// Update Tier
export const updateTier = createAsyncThunk<Ttier, { id: string; formData: FormData }>(
    'tiers/updateTier',
    async ({ id, formData }) => {
        const { data } = await AxiosInstanceForMyApi.put(`/tiers/${id}`, formData);
        return data;
    }
);

// Delete Tier
export const deleteTier = createAsyncThunk<string, string>(
    'tiers/deleteTier',
    async (id) => {
        await AxiosInstanceForMyApi.delete(`/tiers/${id}`);
        return id
    }
);
