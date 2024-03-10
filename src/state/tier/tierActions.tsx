import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Ttier } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Get Tiers
export const getTiers = createAsyncThunk<Ttier[]>(
    'tiers/getTiers',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/tiers');
            return data;
        } catch (error) {
            throw new Error("Something went wrong. Please try again later.");
        }
    }
);

// Get Tier By Id
export const getTierById = createAsyncThunk<Ttier, string>(
    'tiers/getTierById',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/tiers/${id}`);
            return data;
        } catch (error) {
            throw new Error("Something went wrong. Please try again later.");
        }
    }
);

// Create Tier
export const createTier = createAsyncThunk<Ttier, Ttier>(
    'tiers/createTier',
    async (formData) => {
        try {
            const { data } = await AxiosInstanceForMyApi.post('/tiers', formData);
            return data;
        } catch (error) {
            throw new Error("Failed to create tier. Please try again later.");
        }
    }
);

// Update Tier
export const updateTier = createAsyncThunk<Ttier, { id: string; formData: FormData }>(
    'tiers/updateTier',
    async ({ id, formData }) => {
        try {
            const { data } = await AxiosInstanceForMyApi.put(`/tiers/${id}`, formData);
            return data;
        } catch (error) {
            throw new Error("Failed to update tier. Please try again later.");
        }
    }
);

// Delete Tier
export const deleteTier = createAsyncThunk<string, string>(
    'tiers/deleteTier',
    async (id) => {
        try {
            await AxiosInstanceForMyApi.delete(`/tiers/${id}`);
            return id
        } catch (error) {
            throw new Error("Failed to delete tier. Please try again later.");
        }
    }
);
