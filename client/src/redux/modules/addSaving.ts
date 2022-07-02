import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const addSaving: any = createAsyncThunk("user/addSaving",
  async (ingreso, { rejectWithValue }) => {
    try {

      const { data } = await axios.post("/user/savings", ingreso)

      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
})