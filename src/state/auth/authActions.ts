import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import User from './User'

export const registerUser = createAsyncThunk<string, User>(
    'auth/register',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstanceForAuth.post('/auth/login', { username, password })
            return data.token
        } catch (error) {
            return rejectWithValue("Error registering user")
        }
    }
)