import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const closeReview: any = createAsyncThunk("admin/closeReview",
async (reviewId) => {
    const {data} = await axios.put("/admin/closeReview", {reviewId})
    return data
})

export default closeReview;