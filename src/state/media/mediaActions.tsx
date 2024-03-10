import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tmedia } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Create Media
export const createMedia = createAsyncThunk<Tmedia, Tmedia[]>(
    'medias/createMedia',
    async (formData) => {
        const { data } = await AxiosInstanceForMyApi.post('/media', formData);
        return data;
    }
);

// Get Medias
export const getMedias = createAsyncThunk<Tmedia[]>(
    'medias/getMedias',
    async () => {
        const { data } = await AxiosInstanceForMyApi.get('/media');
        return data;
    }
);

// Get Media By Id
export const getMediaById = createAsyncThunk<Tmedia, string>(
    'medias/getMediaById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/media/${id}`);
        return data;
    }
);



// Update Media
export const updateMedia = createAsyncThunk<Tmedia, { id: string; formData: FormData }>(
    'medias/updateMedia',
    async ({ id, formData }) => {
        const { data } = await AxiosInstanceForMyApi.put(`/media/${id}`, formData);
        return data;
    }
);

// Delete Media
export const deleteMedia = createAsyncThunk<string, string>(
    'medias/deleteMedia',
    async (id) => {
        await AxiosInstanceForMyApi.delete(`/media/${id}`);
        return id;
    }
);

export const getMediasByPack = createAsyncThunk<Tmedia[], string>(
    'medias/getMediasByPack',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/media/pack/${id}`)
        return data;
    }
);
