import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
  // Mock OBJ
  todosLosUsuarios: []
  usuario: object
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: User = {
  todosLosUsuarios: [],
  usuario: {},  
  status: 'idle'
}

// export const getAllUsers : any = createAsyncThunk('user/getAllUsers', 
//   (obj, hola) => {
//     console.log("segundo argumento: ", hola)
//   return axios
//     .get("http://localhost:3001")
//     .then(response => response.data)
//     .catch(error => error)
// })

export const registerUser : any = createAsyncThunk("user/registerUser", 
async (user) => {
  const data = await axios.post("/user", user)
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
    // [getAllUsers.pending]: (state) => {
    //   state.status = "loading"
    // },
    // [getAllUsers.fulfilled]: (state, {payload}) => {
    //   state.status = "success"
    //   state.todosLosUsuarios = payload
    // },
    // [getAllUsers.rejected]: (state, {payload}) => {
    //   state.status = "failed"
    //   console.log("error: ", payload)
    // },
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
  }
})

export const {setUser} = reducerSlice.actions
export default reducerSlice.reducer