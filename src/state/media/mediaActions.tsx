import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tmedia } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Create Media
export const createMedia = createAsyncThunk<Tmedia, FormData>(
    'medias/createMedia',
    async (formData) => {
        try {
            const { data } = await AxiosInstanceForMyApi.post('/medias', formData);
            return data;
        } catch (error) {
            throw new Error("Failed to create media. Please try again later.");
        }
    }
);

// Get Medias
export const getMedias = createAsyncThunk<Tmedia[]>(
    'medias/getMedias',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/medias');
            return data;
        } catch (error) {
            throw new Error("Failed to fetch medias. Please try again later.");
        }
    }
);

// Get Media By Id
export const getMediaById = createAsyncThunk<Tmedia, string>(
    'medias/getMediaById',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/medias/${id}`);
            return data;
        } catch (error) {
            throw new Error("Failed to fetch media by ID. Please try again later.");
        }
    }
);



// Update Media
export const updateMedia = createAsyncThunk<Tmedia, { id: string; formData: FormData }>(
    'medias/updateMedia',
    async ({ id, formData }) => {
        try {
            const { data } = await AxiosInstanceForMyApi.put(`/medias/${id}`, formData);
            return data;
        } catch (error) {
            throw new Error("Failed to update media. Please try again later.");
        }
    }
);

// Delete Media
export const deleteMedia = createAsyncThunk<string, string>(
    'medias/deleteMedia',
    async (id) => {
        try {
            await AxiosInstanceForMyApi.delete(`/medias/${id}`);
            return id;
        } catch (error) {
            throw new Error("Failed to delete media. Please try again later.");
        }
    }
);

export const getMediasByPack = createAsyncThunk<Tmedia[], string>(
    'medias/getMediasByPack',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/medias/pack/${id}`)
            return data;
        } catch (error) {
            throw new Error("Something went wrong. Please try again later.");
        }
    }
);
