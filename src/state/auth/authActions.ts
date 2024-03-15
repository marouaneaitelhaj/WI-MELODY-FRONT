import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from '../types'
import AxiosInstanceForMyApi from '../../axios/AxiosInstanceForMyApi'

export const loginAction = createAsyncThunk<string, Tuser>(
    'auth/login',
    async ({ username, password }) => {
        const { data } = await AxiosInstanceForAuth.post('/auth/login', { username, password })
        localStorage.setItem('token', data.token)
        AxiosInstanceForMyApi.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        return data.token as string
    }
)
export const getUserAction = createAsyncThunk<Tuser>(
    'auth/getUser',
    async (_) => {
        const { data } = await AxiosInstanceForMyApi.post('/auth/user', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return data
    }
)
export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_) => {
        localStorage.removeItem('token')
    }
)
export const signUpAction = createAsyncThunk<string, Tuser>(
    'auth/signup',
    async (data) => {
        const { data: { token } } = await AxiosInstanceForAuth.post('/auth/signup', data)
        localStorage.setItem('token', token)
        return token
    }
)
