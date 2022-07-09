import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const searchCrypto: any = createAsyncThunk("crypto",
async (ingreso: any, { rejectWithValue }) => {
  try {
    let searchCryptoData: any = await axios.get("/crypto/searchCrypto", {
      data: ingreso
    });
    return searchCryptoData.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})