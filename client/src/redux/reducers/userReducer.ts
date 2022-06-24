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

export const getAllUsers : any = createAsyncThunk('user/getAllUsers', 
  (obj, hola) => {
    console.log("segundo argumento: ", hola)
  return axios
    .get("http://localhost:3001")
    .then(response => response.data)
    .catch(error => error)
})

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload, 'REDUCERRRR')
      state.usuario = action.payload
    },
    loadMockUser: (state) => {
      state.usuario = {
        "Account": {
          "monthlyInput": [
            {
              "date": "2022-06-22T23:58:46.550Z",
              "description": "Ta caro el gym",
              "amount": 5000,
              "_id": "62b3acbe003d297af5e75ead"
            }
          ],
          "extraInput": [],
          "monthlyExpenses": [],
          "variableExpenses": []
        },
        "_id": "62b3acbe003d297af5e75eac",
        "userName": "Bon Jovi",
        "lastName": "Jovi",
        "email": "bon@jovitojejox",
        "avatar": "jovitoPic",
        "__v": 0
      }
      
    }
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.status = "loading"
    },
    [getAllUsers.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.todosLosUsuarios = payload
    },
    [getAllUsers.rejected]: (state, {payload}) => {
      state.status = "failed"
      console.log("error: ", payload)
    },
  }
})

export const {loadMockUser, setUser} = reducerSlice.actions
export default reducerSlice.reducer