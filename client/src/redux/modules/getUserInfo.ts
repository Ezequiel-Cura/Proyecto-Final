import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const getUserInfo: any = createAsyncThunk("user/getUserInfo",
async () => {
  const { data } = await axios.get("/user/getUserInfo")
  return data
})
