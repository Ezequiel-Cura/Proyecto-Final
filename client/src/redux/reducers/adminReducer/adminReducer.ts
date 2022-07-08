import { createSlice } from "@reduxjs/toolkit";
import changePremium from "./Actions/changePremium";
import changeRole from "./Actions/changeRole";
import getAllUsers from "./Actions/getAllUsers";

interface User {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    premium: boolean,
}

interface adminState {
    allUsers: User[]  
    status: 'idle' | 'loading' | 'success' | 'failed'
  }

const initialState: adminState = {
    allUsers: [],
    status: "idle",
}

const reducerSlice = createSlice({
    name:"admin",
    initialState,
    reducers: {
    },
    extraReducers:{
        [getAllUsers.pending]: (state) => {
            state.status = "loading"
        },
        [getAllUsers.fulfilled]: (state, {payload}) => {
            state.status = "success"
            state.allUsers = payload
        },
        [getAllUsers.rejected]: (state) => {
            state.status = "failed"
        },
        [changeRole.pending]: (state) => {
            state.status = "loading"
        },
        [changeRole.fulfilled]: (state) => {
            state.status = "success"
        },
        [changeRole.rejected]: (state) => {
            state.status = "failed"
        },
        [changePremium.pending]: (state) => {
            state.status = "loading"
        },
        [changePremium.fulfilled]: (state) => {
            state.status = "success"
        },
        [changePremium.rejected]: (state) => {
            state.status = "failed"
        },
    }
})


export default reducerSlice.reducer;