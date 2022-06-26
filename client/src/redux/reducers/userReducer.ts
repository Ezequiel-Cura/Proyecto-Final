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
  usuario: InfoUser
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
    const {data} = await axios.get("/user", {params: user})
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

//-----------------------------------------
export const addIngreso : any = createAsyncThunk("user/ingresos/add", 
async (ingreso, {rejectWithValue}) => {
  try {
    console.log(ingreso, 'Pasa por el reducer')
    const {data} = await axios.put(`/user`, {params: ingreso})
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})
//-----------------------------------------

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.usuario = action.payload
    },    
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
    }
  }
})

export const {setUser} = reducerSlice.actions
export default reducerSlice.reducer