import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: true,
        userType: 'admin',
    },
    reducers: {
        authenticate: (state, action) => {
            state.login += action.payload
            console.log('slice login: ', state.login)
        },
    },
})

// Action creators are generated for each case reducer function
export const { authenticate } = loginSlice.actions

export default loginSlice.reducer