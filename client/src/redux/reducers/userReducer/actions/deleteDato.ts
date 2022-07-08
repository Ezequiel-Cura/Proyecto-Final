import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteDato: any = createAsyncThunk("user/deleteIngreso",
async (ingreso: any, { rejectWithValue }) => {
  try {
    let deleteEntry: any = await axios.delete("/user/account", {
      data: ingreso
    });
    return deleteEntry.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
}
)
