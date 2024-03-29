import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tmedia } from "../types";

// Action to upload audio file
export const uploadAudio = createAsyncThunk<Tmedia, { file: File, pack_id: string }>(
    'uploads/uploadAudio',
    async ({ file, pack_id }: { file: File, pack_id: string }) => {
        console.log(pack_id)
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://localhost:5000/upload-audio', formData);
        return {
            pack_id: pack_id,
            src: response.data.url,
        } as Tmedia;
    }
);

// Action to upload image file
export const uploadImage = createAsyncThunk<string, File>(
    'uploads/uploadImage',
    async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        const response = await axios.post('http://localhost:5000/upload-image', formData);
        return response.data.url;
    }
);

// Action to fetch audio stream
export const fetchAudioStream = (filename: string) => {
    return axios.get(`/uploads/${filename}`, {
        responseType: 'blob',
    });
};