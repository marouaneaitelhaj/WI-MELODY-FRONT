import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action to upload audio file
export const uploadAudio = createAsyncThunk<string, File>(
    'uploads/uploadAudio',
    async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('/upload-audio', formData);
            return response.data.url;
        } catch (error) {
            throw new Error("Failed to upload audio. Please try again later.");
        }
    }
);

// Action to upload image file
export const uploadImage = createAsyncThunk<string, File>(
    'uploads/uploadImage',
    async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('/upload-image', formData);
            return response.data.url;
        } catch (error) {
            throw new Error("Failed to upload image. Please try again later.");
        }
    }
);

// Action to fetch audio stream
export const fetchAudioStream = (filename: string) => {
    return axios.get(`/uploads/${filename}`, {
        responseType: 'blob', // Response type is blob for binary data
    });
};