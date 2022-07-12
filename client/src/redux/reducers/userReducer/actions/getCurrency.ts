import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCurrency: any = createAsyncThunk("currency",
async (ingreso: any, { rejectWithValue }) => {
  try {
    let getCurrencyData: any = await axios.get("/currency", {
      data: ingreso
    });
    return getCurrencyData.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})