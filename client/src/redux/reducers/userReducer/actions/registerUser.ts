import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser: any = createAsyncThunk("user/registerUser",
async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/user/register", user)
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})