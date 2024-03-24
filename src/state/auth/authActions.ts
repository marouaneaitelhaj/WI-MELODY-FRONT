import { createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstanceForAuth from '../../axios/AxiosInstanceForAuth'
import { Tuser } from '../types'
import AxiosInstanceForMyApi from '../../axios/AxiosInstanceForMyApi'
import { showAlertPopUp } from '../confirmationPopUp/AlertSlice'

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

// update banner profile
export const updateBannerProfile = createAsyncThunk<string, { banner: string }>(
    'auth/updateBannerProfile',
    async (banner, api) => {
        const { data } = await AxiosInstanceForMyApi.post('/profile/updateBannerProfile', banner)
        api.dispatch(getUserAction())
        api.dispatch(showAlertPopUp({ title: 'Banner updated successfully', severity: 'success', open: true }))
        return data.data as string
    }
)

// update profile picture

export const updateprofilePicture = createAsyncThunk<string, { profilePicture: string }>(
    'auth/updatePicturerProfile',
    async (profilePicture, api) => {
        const { data } = await AxiosInstanceForMyApi.post('/profile/updateProfilePicture', profilePicture)
        api.dispatch(getUserAction())
        api.dispatch(showAlertPopUp({ title: 'Profile Picture updated successfully', severity: 'success', open: true }))
        return data.data as string
    }
)