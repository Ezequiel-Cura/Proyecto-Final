import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser: any = createAsyncThunk("user/loginUser",
async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/user/login", user)
    localStorage.setItem("logged", "true")
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})