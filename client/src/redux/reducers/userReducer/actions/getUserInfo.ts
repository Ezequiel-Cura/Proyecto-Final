import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getUserInfo: any = createAsyncThunk("user/getUserInfo",
async () => {
  const { data } = await axios.get("/user/getUserInfo")
  if(data?.role !== "admin") {
    localStorage.removeItem("admin")
  } else {
    if (localStorage.getItem("admin") !== "true") {
      localStorage.setItem("admin", "true")
      window.location.reload()
    }
  }
  if(!data?.banned) {
    localStorage.removeItem("banned")
  } 
  else {
    if (localStorage.getItem("banned") !== "true") {
      localStorage.setItem("banned", "true")
      window.location.reload()
    }
  }
  if(data?.verified) {
    localStorage.removeItem("unVerified")
  } else {
    if (localStorage.getItem("unVerified") !== "true") {
      localStorage.setItem("unVerified", "true")
      window.location.reload()
    }
  }
  return data
})
