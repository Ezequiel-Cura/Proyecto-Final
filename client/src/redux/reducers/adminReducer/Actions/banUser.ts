import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const banUser: any = createAsyncThunk("admin/banUser",
async (info) => {
    const {data} = await axios.put("/admin/banUser", info)
    return data
})

export default banUser;