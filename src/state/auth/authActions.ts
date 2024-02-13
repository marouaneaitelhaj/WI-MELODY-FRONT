import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from './Tuser'

export const loginUser = createAsyncThunk<string, Tuser>(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstanceForAuth.post('/auth/login', { username, password })
            localStorage.setItem('token', data.token)
            getUser(data.token)
            return data.token
        } catch (error) {
            return rejectWithValue("Error registering user")
        }
    }
)
export const getUser = createAsyncThunk('auth/getUser', async (token: string, { rejectWithValue }) => {
    try {
        const { data } = await AxiosInstanceForAuth.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        return rejectWithValue("Error getting user")
    }
})