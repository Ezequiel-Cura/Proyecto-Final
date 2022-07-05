import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


  export const deleteCategory: any = createAsyncThunk("user/deleteCategory",
  async (ingreso: any, { rejectWithValue }) => {
    try {
      let deleteEntry: any = await axios.delete("/user/category", {
        data: {
          source: ingreso
        }
      });
      return deleteEntry.data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

