import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


  export const deleteCategory: any = createAsyncThunk("user/deleteCategory",
  async (id: any, { rejectWithValue }) => {
    try {
      let deleteEntry: any = await axios.delete("/user/category", {
        data: {
          _id: id
        }
      });
      return deleteEntry.data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

