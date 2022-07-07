import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const deleteSaving: any = createAsyncThunk("user/deleteSaving",
async (ingreso: any, { rejectWithValue }) => {
  try {
    let deleteEntry: any = await axios.delete("/user/savings", {
      data: ingreso
    });
    return deleteEntry.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})
