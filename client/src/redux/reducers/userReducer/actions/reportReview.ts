import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const reportReview: any = createAsyncThunk("user/reportReview",
async (id) => {
    await axios.post("/user/reportReview", {id})
})

export default reportReview