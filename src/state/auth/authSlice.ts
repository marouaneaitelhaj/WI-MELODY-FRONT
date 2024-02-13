import { createSlice } from '@reduxjs/toolkit'
import { getUser, loginUser } from './authActions'

type user = {
    username: string,
    token: string
}
type AuthState = {
    loading: boolean,
    token: string | null,
    user: user | null,
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
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
            state.error = null
            state.success = false
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.error = null
            state.success = true
            state.token = action.payload
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.success = false
        })
        // getUser
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true
            state.error = null
            state.success = false
        }).addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        }).addCase(getUser.rejected, (state, action) => {
            state.error = action.payload as string
            state.loading = false
            state.success = false
        })
    }
})

export default authSlice.reducer