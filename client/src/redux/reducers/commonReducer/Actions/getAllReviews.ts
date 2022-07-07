import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getAllReviews : any = createAsyncThunk("common/getAllReviews",
async () => {
    const {data} = await axios.get("common/allReviews")
    return data
})

export default getAllReviews