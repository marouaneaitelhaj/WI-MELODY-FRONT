import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tuser } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

export const getArtists = createAsyncThunk<{ content: Tuser[], totalPages: number }, { page: number, size: number, text : string }>(
    'artists/getArtists',
    async ({ page, size, text }) => {
        const { data } = await AxiosInstanceForMyApi.get(`/artists?page=${page}&size=${size}&text=${text}`);
        return data as { content: Tuser[], totalPages: number };
    }
);

export const getArtistById = createAsyncThunk<Tuser, string>(
    'artists/getArtistById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/artists/${id}`);
        return data;
    }
);