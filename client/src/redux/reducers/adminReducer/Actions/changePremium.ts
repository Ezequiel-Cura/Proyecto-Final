import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const changePremium: any = createAsyncThunk("admin/changePremium",
async (info) => {
    await axios.put("/admin/changePremium", info)
})

export default changePremium;