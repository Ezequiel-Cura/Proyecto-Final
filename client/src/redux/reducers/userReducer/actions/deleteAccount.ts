import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteAccount: any = createAsyncThunk("user/deleteAccount",
async () => {
    await axios.delete("/user/deleteAccount")
})

export default deleteAccount