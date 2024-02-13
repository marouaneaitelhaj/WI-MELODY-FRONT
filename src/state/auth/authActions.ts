import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from './Tuser'

export const registerUser = createAsyncThunk<string, Tuser>(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstanceForAuth.post('/auth/login', { username, password })
            localStorage.setItem('token', data.token)
            return data.token
        } catch (error) {
            return rejectWithValue("Error registering user")
        }
    }
)