import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const addDato: any = createAsyncThunk("user/addIngreso",
async (ingreso, { rejectWithValue }) => {
  console.log(ingreso, "ingresooooo")
  try {
    const { data } = await axios.post(`/user/account`, ingreso)
    console.log(data, 'dataaaaaaaaa')
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

