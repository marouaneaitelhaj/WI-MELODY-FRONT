import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tlike } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import { changeLiked } from "../pack/packSlice";
import { showAlertPopUp } from "../confirmationPopUp/AlertSlice";

// Fetching all likes
export const getLikes = createAsyncThunk<Tlike[]>(
    'likes/getLikes',
    async () => {
        const { data } = await AxiosInstanceForMyApi.get('/like');
        return data;
    }
);

// Fetching a single like by ID
export const getLikeById = createAsyncThunk<Tlike, string>(
    'likes/getLikeById',
    async (id) => {
        const { data } = await AxiosInstanceForMyApi.get(`/like/${id}`);
        return data;
    }
);

// Creating a new like
export const createLike = createAsyncThunk<Tlike, Partial<Tlike>>(
    'likes/createLike',
    async (newLike ,  api) => {
        const { data } = await AxiosInstanceForMyApi.post('/like', newLike);
        api.dispatch(changeLiked(data.data.pack.id))
        api.dispatch(
            showAlertPopUp({open:true, title: 'Like added successfully', severity: 'success'})
        )
        return data.data as Tlike;
    }
);

// Updating an existing like
export const updateLike = createAsyncThunk<Tlike, { id: string, updatedLike: Partial<Tlike> }>(
    'likes/updateLike',
    async ({ id, updatedLike }) => {
        const { data } = await AxiosInstanceForMyApi.put(`/like/${id}`, updatedLike);
        return data.data as Tlike;
    }
);

// Deleting an existing like
export const deleteLike = createAsyncThunk<string, string>(
    'likes/deleteLike',
    async (id) => {
        await AxiosInstanceForMyApi.delete(`/like/${id}`);
        return id;
    }
);

// get likes by artist id
export const getLikesByArtistId = createAsyncThunk<Tlike[], string>(
    'likes/getLikesByArtistId',
    async (artistId) => {
        const { data } = await AxiosInstanceForMyApi.get(`/like/artist/${artistId}`);
        return data;
    }
);
