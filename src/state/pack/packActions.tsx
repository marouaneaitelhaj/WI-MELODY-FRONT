import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Tpack } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

export const getPacks = createAsyncThunk<Tpack[]>(
    'artsits/getPacks',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/packs')
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)
export const getPackById = createAsyncThunk<Tpack, string>(
    'packs/getPackById',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/packs/${id}`)
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)