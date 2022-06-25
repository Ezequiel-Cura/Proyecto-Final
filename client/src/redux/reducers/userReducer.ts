import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
  usuario: object
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
  }
})

export const {setUser} = reducerSlice.actions
export default reducerSlice.reducer