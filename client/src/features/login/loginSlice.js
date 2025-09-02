import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: false,
        user : {},
    },
    reducers: {
        authenticate: (state, action) => {
            state.login = true;
            state.user = action.payload
        },
        logout: (state) => {
            state.login = false;
            state.user = {};
        },
    },
})

// Action creators are generated for each case reducer function
export const { authenticate, logout } = loginSlice.actions

export default loginSlice.reducer