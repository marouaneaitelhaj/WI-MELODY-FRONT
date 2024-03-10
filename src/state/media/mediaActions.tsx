import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Tmedia } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

export const getMedias = createAsyncThunk<Tmedia[]>(
    'artsits/getMedias',
    async () => {
        try {
            const { data } = await AxiosInstanceForMyApi.get('/medias')
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)
export const getMediasByPack = createAsyncThunk<Tmedia[], string>(
    'medias/getMediasByPack',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/medias/pack/${id}`)
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)

export const getMediaById = createAsyncThunk<Tmedia, string>(
    'medias/getMediaById',
    async (id) => {
        try {
            const { data } = await AxiosInstanceForMyApi.get(`/medias/${id}`)
            return data
        } catch (error) {
            return isRejectedWithValue("Something went wrong. Please try again later.")
        }
    }
)