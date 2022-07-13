import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCryptoList: any = createAsyncThunk("crypto/getCryptoList",
    async () => {
        try {
            const { data } = await axios.get("/crypto/getCryptoList")
            return data
        } catch (err: any) {
        }
    })