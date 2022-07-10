import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const convertCrypto: any = createAsyncThunk("crypto",
async (ingreso: any, { rejectWithValue }) => {
  try {
    let convertCryptoData: any = await axios.get("/crypto/convertCrypto", {
      data: ingreso
    });
    return convertCryptoData.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})