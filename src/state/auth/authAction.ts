import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from './Tuser'

export const loginUser = createAsyncThunk<string, Tuser>(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstanceForAuth.post('/auth/login', { username, password })
            localStorage.setItem('token', data.token)
            return data.token
        } catch (error) {
            return rejectWithValue("Something went wrong. Please try again later.")
        }
    }
)
export const getUser = createAsyncThunk<Tuser, string>(
    'auth/getUser',
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstanceForAuth.get('/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data
        } catch (error) {
            localStorage.removeItem('token')
            return rejectWithValue("Something went wrong. Please try again later.")
        }
    }
)