import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const logout: any = createAsyncThunk("user/logout",
async () => {
  await axios.post("/user/logout")
  localStorage.removeItem("logged")
})