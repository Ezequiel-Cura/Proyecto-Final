import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const googleLogin: any = createAsyncThunk("user/googleLogin",
async (jwt) => {
  const { data } = await axios.post("/user/googleLogin", {jwt})
  localStorage.setItem("logged", "true")
  if(data?.role === "admin") localStorage.setItem("admin", "true")
  return data
})