import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Tuser } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

export const getArtists = createAsyncThunk<Tuser[]>(
    'artsits/getArtists',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/artists')
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)