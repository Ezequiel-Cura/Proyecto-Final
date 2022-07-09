import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSupportedCurrency: any = createAsyncThunk("crypto",
    async () => {
        try {
            const { data } = await axios.get("/crypto/supportedCurrency")
            return data
        } catch (err: any) {
            console.log(err)
        }
    })