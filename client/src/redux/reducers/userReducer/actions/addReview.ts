import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const addReview: any = createAsyncThunk("user/addReview",
async (review) => {
    const {data} = await axios.post("/user/review", review)
    return data
})

export default addReview