import { createAsyncThunk } from "@reduxjs/toolkit";
import {  Tuser } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

export const getArtists = createAsyncThunk<Tuser[]>(
    'artsits/getArtists',
    async () => {
        const { data } = await AxiosInstanceForMyApi.get('/artists')
        return data
    }
)
export const getArtistById = createAsyncThunk<Tuser, string>(
    'artists/getArtistById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/artists/${id}`)
        return data
    }
)