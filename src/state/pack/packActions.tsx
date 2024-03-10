import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Tpack } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Fetching all packs
export const getPacks = createAsyncThunk<Tpack[]>(
    'packs/getPacks',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/packs');
            return data;
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.");
        }
    }
);

// Fetching a single pack by ID
export const getPackById = createAsyncThunk<Tpack, string>(
    'packs/getPackById',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/packs/${id}`);
            return data;
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.");
        }
    }
);

// Creating a new pack
export const createPack = createAsyncThunk<Tpack, Partial<Tpack>>(
    'packs/createPack',
    async (newPack) => {
        try {
            const { data } = await AxiosInstanceForMyApi.post('/packs', newPack);
            return data;
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.");
        }
    }
);

// Updating an existing pack
export const updatePack = createAsyncThunk<Tpack, { id: string, updatedPack: Partial<Tpack> }>(
    'packs/updatePack',
    async ({ id, updatedPack }) => {
        try {
            const { data } = await AxiosInstanceForMyApi.put(`/packs/${id}`, updatedPack);
            return data;
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.");
        }
    }
);

// Deleting an existing pack
export const deletePack = createAsyncThunk<string, string>(
    'packs/deletePack',
    async (id) => {
        try {
            await AxiosInstanceForMyApi.delete(`/packs/${id}`);
            return id; // Return the id of the deleted pack upon successful deletion
        } catch (error) {
            throw new Error("Something went wrong. Please try again later."); // Throw an error to be handled in the rejected case
        }
    }
);
