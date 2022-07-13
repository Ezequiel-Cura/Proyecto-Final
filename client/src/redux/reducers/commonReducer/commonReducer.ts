import { createSlice } from "@reduxjs/toolkit";
import getAllReviews from "./Actions/getAllReviews";

export interface IUserReview {
    review : {
        text: string
        rating: number
        reports: []
    }
    _id : string
    firstName: string
    avatar: string
}
interface commonState {
    allReviews: IUserReview[]
    status: 'idle' | 'loading' | 'success' | 'failed'
  }

const initialState: commonState = {
    status: "idle",
    allReviews: []
}

const reducerSlice = createSlice({
    name:"common",
    initialState,
    reducers: {
    },
    extraReducers:{
        [getAllReviews.pending]: (state) => {
            state.status = "loading"
        },
        [getAllReviews.fulfilled]: (state, {payload}) => {
            state.status = "success"
            state.allReviews = payload
        },
        [getAllReviews.rejected]: (state) => {
            state.status = "failed"
        },
    }
})


export default reducerSlice.reducer;