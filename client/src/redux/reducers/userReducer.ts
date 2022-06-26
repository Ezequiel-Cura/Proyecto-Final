import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Detalle {
  date: string,
  amount: number,
  description: string
}
interface InfoUser {
  Account: {
    monthlyInput: [],
    extraInput: Detalle[],
    monthlyExpenses: [],
    variableExpenses: []
  },
  _id: string,
  userName: string,
  lastName: string,
  email: string,
  password: string,
}
interface User {
  usuario: any   //any
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: User = {
  usuario: {
    Account: {
      monthlyInput: [],
      extraInput: [],
      monthlyExpenses: [],
      variableExpenses: []
    },
    _id: '',
    userName: '',
    lastName: '',
    email: '',
    password: '',
  },  
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
    const {data} = await axios.post("/user/login", user)
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

//-----------------------------------------
export const addIngreso : any = createAsyncThunk("user/addIngreso", 
async (ingreso, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`/user/account`, ingreso)
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const deleteIngreso : any = createAsyncThunk("user/deleteIngreso",
async (ingreso : any, {rejectWithValue}) => {
  try {
    const data = await axios.delete("/user/account", ingreso)
    return data
  } catch (err : any) {
    return rejectWithValue(err.response.data)
  }
}
)

//-----------------------------------------
export const uploadImage: any = createAsyncThunk("user/uploadImage",
async (info: any) => {
  let formData = new FormData();
  formData.append("file", info.img)
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET as string | Blob)  
  const result = await axios.post("https://api.cloudinary.com/v1_1/finanzas-personales/image/upload", formData, {withCredentials: false})
  const {data} = await axios.put("/user", {id: info.id, key: "avatar", value: result.data.url})
  return data
})

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "loading"
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario = payload
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
//---------------------------------------------------------
    [addIngreso.pending]: (state) => {
      state.usuario = {...state.usuario}
    },
    [addIngreso.fulfilled]: (state, {payload}) => {
      state.usuario = payload
    },
    [addIngreso.rejected]: (state) => {
      state.usuario = {...state.usuario}
    },
    [deleteIngreso.pending]: (state) => {
      state.usuario = {...state.usuario}
    },
    [deleteIngreso.fulfilled]: (state, {payload}) => {
      state.usuario = payload
    },
    [deleteIngreso.rejected]: (state) => {
      state.usuario = {...state.usuario}
    },
    [uploadImage.pending]: (state) => {
      state.status = "loading"
    },
    [uploadImage.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario[payload.key] = payload.value
    },
    [uploadImage.rejected]: (state) => {
      state.status = "failed"
    },
  }
})

export default reducerSlice.reducer