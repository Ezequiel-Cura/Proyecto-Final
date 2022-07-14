import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser: any = createAsyncThunk("user/loginUser",
async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/user/login", user)// eslint-disable-line
    localStorage.setItem("logged", "true")
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})