import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteReview: any = createAsyncThunk("user/deleteReview",
async () => {
    await axios.delete("/user/review")
    return
})

export default deleteReview