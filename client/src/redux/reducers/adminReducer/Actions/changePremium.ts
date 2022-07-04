import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const changePremium: any = createAsyncThunk("admin/changePremium",
async (info) => {
    const {data} = await axios.put("/admin/changePremium", info)
    return data
})

export default changePremium;