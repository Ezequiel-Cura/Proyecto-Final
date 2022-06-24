import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
  // Mock OBJ
  todosLosUsuarios: []
  usuario: Count;
  status: 'idle' | 'loading' | 'success' | 'failed'
}

interface Ingresos{
  date: string;
  description: string;
  amount: number
  _id: string
}

interface Count {
  Account: {
    monthlyInput: Ingresos[]
    extraInput: Ingresos[]
    monthlyExpenses: Ingresos[]
    variableExpenses: Ingresos[]
  };
  _id: string;
  userName: string;
  lastName: string;
  email: string;
  avatar: string;
  __v: number
}

const initialState: User = {
  todosLosUsuarios: [],
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
    avatar: '',
    __v: 0
  },  
  status: 'idle'
}

<<<<<<< HEAD
export const getAllUsers : any = createAsyncThunk('user/getAllUsers', 
  (obj, hola) => {
    console.log(obj)
    console.log("segundo argumento: ", hola)
  return axios
    .get("http://localhost:3001/user")
    .then(response => response.data)
    .catch(error => error)
=======
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
>>>>>>> 627b9293f49399525af5f30e775c2378d6351d11
})

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'REDUCERRRR')
<<<<<<< HEAD
      state.todosLosUsuarios = action.payload
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
      console.log('pending')
=======
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
>>>>>>> 627b9293f49399525af5f30e775c2378d6351d11
      state.status = "loading"
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.status = "success"
<<<<<<< HEAD
      state.todosLosUsuarios = payload
      console.log('sucess')
=======
      state.usuario = payload
>>>>>>> 627b9293f49399525af5f30e775c2378d6351d11
    },
    [registerUser.rejected]: (state) => {
      state.status = "failed"
    },
  }
})

export const {setUser} = reducerSlice.actions
export default reducerSlice.reducer