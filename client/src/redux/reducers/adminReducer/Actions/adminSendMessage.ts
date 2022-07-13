import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const adminSendMessage: any = createAsyncThunk("admin/adminSendMessage",
async (info) => {
    await axios.post("/admin/adminSendMessage", info)
})

export default adminSendMessage