import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Ttier } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

export const getTiers = createAsyncThunk<Ttier[]>(
    'artsits/getTiers',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/tiers')
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)
export const getTierById = createAsyncThunk<Ttier, string>(
    'tiers/getTierById',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/tiers/${id}`)
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)