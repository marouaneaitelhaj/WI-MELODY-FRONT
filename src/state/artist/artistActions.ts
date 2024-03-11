import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Ttier, Tuser } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import axios from "axios";
import AxiosInstanceForAuth from "../../axios/AxiosInstanceForAuth";

export const getArtists = createAsyncThunk<Tuser[]>(
    'artsits/getArtists',
    async () => {
        const { data } = await AxiosInstanceForAuth.get('/artists')
        return data
    }
)
export const getArtistById = createAsyncThunk<Tuser, string>(
    'artists/getArtistById',
    async (id) => {
        const { data } = await AxiosInstanceForAuth.get(`/artists/${id}`)
        return data
    }
)