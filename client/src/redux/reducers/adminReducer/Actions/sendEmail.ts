import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const sendEmail: any = createAsyncThunk("admin/sendEmail",
async (info) => {
    await axios.post("/admin/sendEmail", info)
})

export default sendEmail;