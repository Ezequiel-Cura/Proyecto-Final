import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const updatePersonalInfo: any = createAsyncThunk("user/updatePersonalInfo",
  async (info: any) => {
    const { data } = await axios.put("/user/update", info)
    return data
})

export default updatePersonalInfo