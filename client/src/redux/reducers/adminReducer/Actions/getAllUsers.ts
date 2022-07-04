import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getAllUsers: any = createAsyncThunk("admin/getAllUsers",
async () => {
    const {data} = await axios.get("/admin/getAllUsers")
    return data
})

export default getAllUsers;