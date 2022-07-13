import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Form{
  id: string,
  to: string,
  amount: number
}

export const convertCrypto: any = createAsyncThunk("crypto/convertCrypto",
async (ingreso: Form, { rejectWithValue }) => {
  const { id, to, amount } = ingreso
  try {
    let convertCryptoData: any = await axios.get("/crypto/convertCrypto?id="+ id + "&to="+ to + "&amount=" + amount, {
      data: ingreso
    });
    return convertCryptoData.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})