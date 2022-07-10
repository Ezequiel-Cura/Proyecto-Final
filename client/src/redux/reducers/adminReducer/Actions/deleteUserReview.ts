import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const deleteUserReview: any = createAsyncThunk("admin/deleteUserReview",
async (id) => {
    const {data} = await axios.delete(`/admin/deleteUserReview/?id=${id}`)
    return data
})

export default deleteUserReview;