import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const sendSupportMessage: any = createAsyncThunk("user/sendSupportMessage",
async (message) => {
    await axios.post("/user/supportMessages", {message})
})


export default sendSupportMessage