import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
  usuario: any
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: User = {
  usuario: {},  
  status: 'idle',
}

export const registerUser : any = createAsyncThunk("user/registerUser", 
async (user, {rejectWithValue}) => {
  try {
    const {data} = await axios.post("/user", user)
    return data
  } catch (err : any) {
    return rejectWithValue(err.response.data)
  }
})

export const loginUser : any = createAsyncThunk("user/loginUser", 
async (user, {rejectWithValue}) => {
  try {
    const {data} = await axios.get("/user", {params: user})
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const uploadImage: any = createAsyncThunk("user/uploadImage",
async (info: any) => {
  let formData = new FormData();
  formData.append("file", info.img)
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET as string | Blob)  
  const result = await axios.post("https://api.cloudinary.com/v1_1/finanzas-personales/image/upload", formData, {withCredentials: false})
  const {data} = await axios.put(`/user/${info.id}`, {avatar: result.data.url})
  return data
})

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload, 'REDUCERRRR')
      state.usuario = action.payload
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "loading"
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.status = "success"
    },
    [registerUser.rejected]: (state) => {
      state.status = "failed"
    },
    [loginUser.pending]: (state) => {
      state.status = "loading"
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario = payload
    },
    [loginUser.rejected]: (state) => {
      state.status = "failed"
    },
    [uploadImage.pending]: (state) => {
      state.status = "loading"
    },
    [uploadImage.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario.avatar = payload
    },
    [uploadImage.rejected]: (state) => {
      state.status = "failed"
    },
  }
})

export const {setUser} = reducerSlice.actions
export default reducerSlice.reducer