import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
  usuario: any   
  status: 'idle' | 'loading' | 'success' | 'failed'
  totalInput: number
  allInputs: []
  categoryFilterIngreso: [] 
  categoryFilterGastos: [] 
}

const initialState: User = {
  usuario: {
    Account: {
      monthlyInput: [],
      extraInput: [],
      monthlyExpenses: [],
      variableExpenses: [],
    },
    _id: '',
    userName: '',
    lastName: '',
    email: '',
    password: '',
  },  
  status: 'idle',
  totalInput: 0,
  allInputs: [],
  categoryFilterIngreso: [],
  categoryFilterGastos: [] 
}

export const registerUser : any = createAsyncThunk("user/registerUser", 
async (user, {rejectWithValue}) => {
  try {
    const {data} = await axios.post("/user/register", user)
    localStorage.setItem("logged", "true")
    return data
  } catch (err : any) {
    return rejectWithValue(err.response.data)
  }
})

export const loginUser : any = createAsyncThunk("user/loginUser", 
async (user, {rejectWithValue}) => {
  try {
    const {data} = await axios.post("/user/login", user)
    localStorage.setItem("logged", "true")
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const googleLogin: any = createAsyncThunk("user/googleLogin",
async (jwt) => {
  const {data} = await axios.post("/user/googleLogin", {jwt: jwt})
    localStorage.setItem("logged", "true")
    return data
})

export const logout: any =createAsyncThunk("user/logout",
async ()=>{
  await axios.post("/user/logout")
  localStorage.removeItem("logged")
})

export const getUserInfo: any = createAsyncThunk("user/getUserInfo",
async ()=> {
  const {data} = await axios.get("/user/getUserInfo")
  return data
})

//-----------------------------------------
export const addDato : any = createAsyncThunk("user/addIngreso", 
async (ingreso, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`/user/account`, ingreso)
    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const deleteDato : any = createAsyncThunk("user/deleteIngreso",
async (ingreso: any, {rejectWithValue}) => {
  try {
    console.log("ingreso------>", ingreso)
    let deleteEntry: any = await axios.delete("/user/account", {
      data: {
        source: ingreso
      }
    });
    return deleteEntry.data
  } catch (err : any) {
    return rejectWithValue(err.response.data)
  }
}
)

export const uploadImage: any = createAsyncThunk("user/uploadImage",
async (info: any) => {
  let formData = new FormData();
  formData.append("file", info.img)
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET as string | Blob)  
  const result = await axios.post("https://api.cloudinary.com/v1_1/finanzas-personales/image/upload", formData, {withCredentials: false})
  const {data} = await axios.put("/user", {id: info.id, key: "avatar", value: result.data.url})
  return data
})

// export const updateUser: any = createAsyncThunk("user/updateName",
// async (data: any) => {
//   const userUpdated = await axios.put("/user", {id: data.id, key: "userName", value: data.userName})
//   return userUpdated.data
// })

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllInputs (state) {

    },
    inputsFilterByMonth (state, {payload}){

    },
    totalInput (state, {payload}) {
      let total : number = 0;
      let monto : any = payload.usuario.Account.extraInput.forEach((e: any) => total += parseInt(e.amount))
      state.totalInput = monto
    },
    // totalExpenses: (state) => {
    //   let totalExpensesAmount: number = state.allExpenses.reduce( (acc: any, entrie: any) =>  acc += entrie.amount )
    //   return {
    //     ...state,
    //     totalExpensesMonth: totalExpensesAmount
    //   }
    // },
    categoriesFilterIngresos (state, {payload}) {
      let categoriesFilterMonthly = state.allInputs.filter( (obj : any) => payload !== obj.monthlyInput.category)
      let categoriesFilterExtra = state.allInputs.filter( (obj : any) => payload !== obj.extraInput.category)
      let todo : any = categoriesFilterMonthly.concat(categoriesFilterExtra)
      state.categoryFilterIngreso = todo
    },
    categoriesFilterGastos (state, {payload}) {
      let categoriesFilterMonthly = state.allInputs.filter( (obj : any) => payload !== obj.monthlyExpenses.category)
      let categoriesFilterVariable = state.allInputs.filter( (obj : any) => payload !== obj.variableExpenses.category)
      let todo : any = categoriesFilterMonthly.concat(categoriesFilterVariable)
      state.categoryFilterGastos = todo
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
    [googleLogin.pending]: (state) => {
      state.status = "loading"
    },
    [googleLogin.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario = payload
    },
    [googleLogin.rejected]: (state) => {
      state.status = "failed"
    },
    [logout.pending]: (state) => {
      state.status = "loading"
    },
    [logout.fulfilled]: (state) => {
      state.status = "success"
    },
    [logout.rejected]: (state) => {
      state.status = "failed"
    },
    [getUserInfo.pending]: (state) => {
      state.status = "loading"
    },
    [getUserInfo.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario = payload
    },
    [getUserInfo.rejected]: (state) => {
      state.status = "failed"
    },
//---------------------------------------------------------
    [addDato.pending]: (state) => {
      state.status = "loading"
    },   
    [addDato.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.usuario = payload
    },
    [addDato.rejected]: (state) => {
      state.status = "failed"
    },
    [deleteDato.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteDato.fulfilled]: (state, {payload}) => {
      state.status = 'success'
      state.usuario = payload
    },
    [deleteDato.rejected]: (state) => {
      state.status = 'failed'
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
export const {totalInput, getAllInputs, inputsFilterByMonth} = reducerSlice.actions
export default reducerSlice.reducer