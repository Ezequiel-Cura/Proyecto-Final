import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllReports: any = createAsyncThunk("admin/getAllReports",
async () => {
    const {data} = await axios.get("/admin/getAllReports")
    return data
})

export default getAllReports;