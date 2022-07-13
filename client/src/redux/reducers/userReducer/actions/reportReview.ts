import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const reportReview: any = createAsyncThunk("user/reportReview",
async (info) => {
    await axios.post("/user/reportReview", info)
})

export default reportReview