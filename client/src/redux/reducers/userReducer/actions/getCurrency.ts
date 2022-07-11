import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCurrency: any = createAsyncThunk("currency",
async (ingreso: any, { rejectWithValue }) => {
  const { to, from, amount } = ingreso
  try {
    let getCurrencyData: any = await axios.get("/currency?to="+to+"&from="+from+"&amount="+amount, {
      data: ingreso
    });
    return getCurrencyData.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})