import { createSlice } from "@reduxjs/toolkit";
import changePremium from "./Actions/changePremium";
import changeRole from "./Actions/changeRole";
import deleteUserReview from "./Actions/deleteUserReview";
import getAllUsers from "./Actions/getAllUsers";
import getUserById from "./Actions/getUserById";
import sendEmail from "./Actions/sendEmail";

interface User {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    premium: boolean,
    avatar: string
    review: {
        text: string,
        rating: number
    }
    supportMessages: string[]
}

interface adminState {
    allUsers: User[]  
    userCard: User
    status: 'idle' | 'loading' | 'success' | 'failed'
  }

const initialState: adminState = {
    allUsers: [],
    userCard: {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        premium: false,
        avatar: "",
        review: {
            text: "",
            rating: 0
        },
        supportMessages: []
},
    status: "idle",
}

const reducerSlice = createSlice({
    name:"admin",
    initialState,
    reducers: {
        cleanUserCard: (state) => {
            state.userCard = {
                _id: "",
                email: "",
                firstName: "",
                lastName: "",
                role: "",
                premium: false,
                avatar: "",
                review: {
                    text: "",
                    rating: 0
                },
                supportMessages: []
            }
        }
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
        [getUserById.pending]: (state) => {
            state.status = "loading"
        },
        [getUserById.fulfilled]: (state, {payload}) => {
            state.status = "success"
            state.userCard = payload
        },
        [getUserById.rejected]: (state) => {
            state.status = "failed"
        },
        [sendEmail.pending]: (state) => {
            state.status = "loading"
        },
        [sendEmail.fulfilled]: (state) => {
            state.status = "success"
        },
        [sendEmail.rejected]: (state) => {
            state.status = "failed"
        },
        [deleteUserReview.pending]: (state) => {
            state.status = "loading"
        },
        [deleteUserReview.fulfilled]: (state, {payload}) => {
            state.status = "success"
            console.log("payload: ",payload)
            state.userCard.review = payload
        },
        [deleteUserReview.rejected]: (state) => {
            state.status = "failed"
        },
    }
})

export const {cleanUserCard} = reducerSlice.actions


export default reducerSlice.reducer;