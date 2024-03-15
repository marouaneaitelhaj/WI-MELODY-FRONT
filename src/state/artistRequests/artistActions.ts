import { createAsyncThunk } from "@reduxjs/toolkit";
import { TartistRequests } from "../types";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";

// Base URL for your API
const API_BASE_URL = "/artistrequests";

// Save Artist Request
export const saveArtistRequest = createAsyncThunk<TartistRequests, TartistRequests>(
  'artistRequests/save',
  async (requestData) => {
    const response = await AxiosInstanceForMyApi.post(`${API_BASE_URL}`, requestData);
    return response.data;
  }
);

// Reject Artist Request
export const rejectArtistRequest = createAsyncThunk<TartistRequests, number>(
  'artistRequests/reject',
  async (requestId) => {
    const response = await AxiosInstanceForMyApi.post(`${API_BASE_URL}/reject/${requestId}`);
    return response.data;
  }
);

// getArtistRequests
export const getArtistRequests = createAsyncThunk<TartistRequests[], void>(
  'artistRequests/get',
  async () => {
    const response = await AxiosInstanceForMyApi.get(`${API_BASE_URL}`);
    return response.data;
  }
);

// Approve Artist Request
export const approveArtistRequest = createAsyncThunk<TartistRequests, number>(
  'artistRequests/approve',
  async (requestId) => {
    const response = await AxiosInstanceForMyApi.post(`${API_BASE_URL}/approve/${requestId}`);
    return response.data;
  }
);

// Find Artist Request By ID
export const findArtistRequestById = createAsyncThunk<TartistRequests, number>(
  'artistRequests/findById',
  async (requestId) => {
    const response = await AxiosInstanceForMyApi.get(`${API_BASE_URL}/${requestId}`);
    return response.data;
  }
);

// Find All Artist Requests
export const findAllArtistRequests = createAsyncThunk<TartistRequests[]>(
  'artistRequests/findAll',
  async () => {
    const response = await AxiosInstanceForMyApi.get(`${API_BASE_URL}`);
    return response.data;
  }
);
