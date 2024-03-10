import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from '../types'
import AxiosInstanceForMyApi from '../../axios/AxiosInstanceForMyApi'

export const loginAction = createAsyncThunk<string, Tuser>(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        const { data } = await AxiosInstanceForAuth.post('/auth/login', { username, password })
        localStorage.setItem('token', data.token)
        return data.token
    }
)
export const getUserAction = createAsyncThunk<Tuser>(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        const { data } = await AxiosInstanceForMyApi.post('/auth/user', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return data
        localStorage.removeItem('token')
        return rejectWithValue("Something went wrong. Please try again later.")
    }
)
export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        localStorage.removeItem('token')
        return rejectWithValue("Something went wrong. Please try again later.")
    }
)
export const signUpAction = createAsyncThunk<string, Tuser>(
    'auth/signup',
    async (data, { rejectWithValue }) => {
        const { data: { token } } = await AxiosInstanceForAuth.post('/auth/signup', data)
        localStorage.setItem('token', token)
        return token
    }
)
