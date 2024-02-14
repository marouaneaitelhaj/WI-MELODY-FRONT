import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from '../types'
import AxiosInstanceForMyApi from '../../axios/AxiosInstanceForMyApi'

export const loginAction = createAsyncThunk<string, Tuser>(
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
export const getUserAction = createAsyncThunk<Tuser>(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AxiosInstanceForMyApi.post('/auth/user' , {} , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
            return data
        } catch (error) {
            localStorage.removeItem('token')
            return rejectWithValue("Something went wrong. Please try again later.")
        }
    }
)
export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token')
        } catch (error) {
            return rejectWithValue("Something went wrong. Please try again later.")
        }
    }
)