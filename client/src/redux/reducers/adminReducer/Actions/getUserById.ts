import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUserById: any = createAsyncThunk("admin/getUserById",
async (id) => {
    const {data} = await axios.post("/admin/getUserById", {id})
    return data
})

export default getUserById;