import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const addCategory: any = createAsyncThunk("user/addCategory",
async (ingreso, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/user/category`, ingreso)

    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

