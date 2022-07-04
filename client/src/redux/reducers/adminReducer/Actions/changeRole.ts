import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const changeRole: any = createAsyncThunk("admin/changeRole",
async (info) => {
    const {data} = await axios.put("/admin/changeRole", info)
    return data
})

export default changeRole;