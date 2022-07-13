import { createSlice } from "@reduxjs/toolkit";
import changePremium from "./Actions/changePremium";
import changeRole from "./Actions/changeRole";
import deleteUser from "./Actions/deleteUser";
import deleteUserReview from "./Actions/deleteUserReview";
import getAllUsers from "./Actions/getAllUsers";
import getUserById from "./Actions/getUserById";
import sendEmail from "./Actions/sendEmail";
import banUser from "./Actions/banUser";
import getAllReports from "./Actions/getAllReports";
import closeReview from "./Actions/closeReview";

export interface IUser {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    premium: boolean,
    avatar: string
    review: {
        text: string,
        rating: number,
        reports: [{
            reportedBy: string
            reason: string
            _id: string
            status: string
        }]
    }
    banned?: boolean,
    supportMessages: {
        id: string,
        message: string
    }
    createdAt: Date | null
    updatedAt: Date | null
}

interface adminState {
    allUsers: IUser[]  
    userCard: IUser
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
            rating: 0,
            reports: [{
                reportedBy: "",
                reason: "",
                _id: "",
                status: "",
            }],
        },
        supportMessages: {
            id: "",
            message: ""
        },
        banned: false,
        updatedAt: null,
        createdAt: null,
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
                rating: 0,
                reports: [{
                    reportedBy: "",
                    reason: "",
                    _id: "",
                    status: "",
                }]
            },
            supportMessages: {
                id: "",
                message: ""
            },
            createdAt: null,
            updatedAt: null,
        }
    },
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
        [getAllReports.pending]: (state) => {
            state.status = "loading"
        },
        [getAllReports.fulfilled]: (state, {payload}) => {
            state.status = "success"
        },
        [getAllReports.rejected]: (state) => {
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
            state.userCard.review = payload
        },
        [deleteUserReview.rejected]: (state) => {
            state.status = "failed"
        },
        [deleteUser.pending]: (state) => {
            state.status = "loading"
        },
        [deleteUser.fulfilled]: (state) => {
            state.status = "success"
        },
        [deleteUser.rejected]: (state) => {
            state.status = "failed"
        },
        [banUser.pending]: (state) => {
            state.status = "loading"
        },
        [banUser.fulfilled]: (state) => {
            state.status = "success"
        },
        [banUser.rejected]: (state) => {
            state.status = "failed"
        },
        [closeReview.pending]: (state) => {
            state.status = "loading"
        },
        [closeReview.fulfilled]: (state) => {
            state.status = "success"
        },
        [closeReview.rejected]: (state) => {
            state.status = "failed"
        },
    }
})

export const {cleanUserCard} = reducerSlice.actions


export default reducerSlice.reducer;