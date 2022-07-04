import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const addCategory: any = createAsyncThunk("user/addCategory",
async (ingreso, { rejectWithValue }) => {
  try {
    console.log(ingreso, 'reduce')
    const { data } = await axios.post(`/user/category`, ingreso)
    console.log(data, "DATAAAA")
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

