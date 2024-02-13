import { createSlice } from '@reduxjs/toolkit'
import { getUserAction, loginAction } from './authActions'
import { Tuser } from '../types'

type AuthState = {
    loading: boolean,
    token: string | null,
    user: Tuser | null,
    isAuthenticated: boolean,
    error: string | null,
    success: boolean
}

const initialState: AuthState = {
    token: null,
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // Login
        builder.addCase(loginAction.pending, (state, action) => {
            state.loading = true
            state.error = null
            state.success = false
        }).addCase(loginAction.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.error = null
            state.success = true
            state.token = action.payload
        }).addCase(loginAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.success = false
        })
        // getUser
        builder.addCase(getUserAction.pending, (state, action) => {
            state.loading = true
            state.error = null
            state.success = false
        }).addCase(getUserAction.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        }).addCase(getUserAction.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
            state.success = false
        })
    }
})

export default authSlice.reducer