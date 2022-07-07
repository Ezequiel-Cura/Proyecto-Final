import { createSlice } from "@reduxjs/toolkit";
import getAllReviews from "./Actions/getAllReviews";

interface commonState {
    allReviews: object[]
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