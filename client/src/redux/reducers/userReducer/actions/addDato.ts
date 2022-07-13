import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const addDato: any = createAsyncThunk("user/addIngreso",
async (ingreso, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/user/account`, ingreso)
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

