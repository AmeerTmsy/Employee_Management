import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: false,
        userType: 'employee',
    },
    reducers: {
        authenticate: (state, action) => {
            state.login = action.payload.login
            state.userType = action.payload.userType
        },
    },
})

// Action creators are generated for each case reducer function
export const { authenticate } = loginSlice.actions

export default loginSlice.reducer