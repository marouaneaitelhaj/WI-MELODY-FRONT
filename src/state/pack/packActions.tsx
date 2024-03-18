import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tpack } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Fetching all packs
export const getPacks = createAsyncThunk<Tpack[]>(
    'packs/getPacks',
    async () => {
        const { data } = await AxiosInstanceForMyApi.get('/pack');
        return data;
    }
);

// Fetching a single pack by ID
export const getPackById = createAsyncThunk<Tpack, string>(
    'packs/getPackById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/pack/${id}`);
        return data;
    }
);

// Creating a new pack
export const createPack = createAsyncThunk<Tpack, Partial<Tpack>>(
    'packs/createPack',
    async (newPack) => {
        const { data } = await AxiosInstanceForMyApi.post('/pack', newPack);
        return data.data as Tpack;
    }
);

// Updating an existing pack
export const updatePack = createAsyncThunk<Tpack, { id: string, updatedPack: Partial<Tpack> }>(
    'packs/updatePack',
    async ({ id, updatedPack }) => {
        const { data } = await AxiosInstanceForMyApi.put(`/pack/${id}`, updatedPack);
        return data;
    }
);

// Deleting an existing pack
export const deletePack = createAsyncThunk<string, string>(
    'packs/deletePack',
    async (id) => {
        await AxiosInstanceForMyApi.delete(`/pack/${id}`);
        return id;
    }
);

// get packs by artist id
export const getPacksByArtistId = createAsyncThunk<Tpack[], string>(
    'packs/getPacksByArtistId',
    async (artistId) => {
        const { data } = await AxiosInstanceForMyApi.get(`/pack/artist/${artistId}`);
        return data;
    }
);
