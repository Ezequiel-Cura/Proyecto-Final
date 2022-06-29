import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { isArrayBindingPattern } from "typescript";
import { number } from "yup";

interface Entries {
  _id?: string,
  description: string,
  date: string,
  amount: number,
  category?: string,
  end?: string
}
interface User {
  usuario: any   //any
  status: 'idle' | 'loading' | 'success' | 'failed'
  allInputs: Entries[] | [],
  allExpenses: Entries[] | [],
  totalExpensesMonth: number,
  totalInputsMonth: number
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
  allInputs: [],  //Estado de entradas para ordenar o filtrar
  allExpenses: [], //Estado de gastos para ordenar o filtrar
  totalExpensesMonth: 0,
  totalInputsMonth: 0

}

export const registerUser: any = createAsyncThunk("user/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/user/register", user)
      localStorage.setItem("logged", "true")
      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  })

export const loginUser: any = createAsyncThunk("user/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/user/login", user)
      localStorage.setItem("logged", "true")
      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  })

export const googleLogin: any = createAsyncThunk("user/googleLogin",
  async (jwt) => {
    const { data } = await axios.post("/user/googleLogin", { jwt: jwt })
    localStorage.setItem("logged", "true")
    return data
  })

export const logout: any = createAsyncThunk("user/logout",
  async () => {
    await axios.post("/user/logout")
    localStorage.removeItem("logged")
  })

export const getUserInfo: any = createAsyncThunk("user/getUserInfo",
  async () => {
    const { data } = await axios.get("/user/getUserInfo")
    return data
  })

//-----------------------------------------
export const addDato: any = createAsyncThunk("user/addIngreso",
  async (ingreso, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/user/account`, ingreso)
      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  })

export const deleteDato: any = createAsyncThunk("user/deleteIngreso",
  async (ingreso: any, { rejectWithValue }) => {
    try {

      let deleteEntry: any = await axios.delete("/user/account", {
        data: {
          source: ingreso
        }
      });
      return deleteEntry.data
    } catch (err: any) {
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
    const result = await axios.post("https://api.cloudinary.com/v1_1/finanzas-personales/image/upload", formData, { withCredentials: false })
    const { data } = await axios.put("/user", { id: info.id, key: "avatar", value: result.data.url })
    return data
  })


const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllInputs: (state) => {
      let currentInputState = current(state)
      state.allInputs = [...currentInputState.usuario.Account.monthlyInput, ...currentInputState.usuario.Account.extraInput]
    },
    getAllExpenses: (state) => {
      let currentExpensesState = current(state)
      state.allExpenses = [...currentExpensesState.usuario.Account.monthlyExpenses, ...currentExpensesState.usuario.Account.variableExpenses]
    },
    expensesFilterByMonth: (state, { payload }) => {
      const allExpensesFilter = [...state.usuario.Account.monthlyExpenses, ...state.usuario.Account.variableExpenses]
      const expFilter: Entries[] = allExpensesFilter.filter((entrie: Entries) => entrie.date.split("-")[1] === payload)

      const expOrder = expFilter.sort((a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2]))
      return {
        ...state,
        allExpenses: expOrder
      }
    },
    expensesFilterByFrequency: (state, { payload }) => {
      const expensesByFrequency = payload === 'fijo'
        ? [...state.usuario.Account.monthlyExpenses]
        : [...state.usuario.Account.variableExpenses]
      return {
        ...state,
        allExpenses: expensesByFrequency
      }
    },
    expensesOrderByAmount: (state, { payload }) => {
      const orderExpenses = state.allExpenses.length 
      ? state.allExpenses
      : [...state.usuario.Account.monthlyExpenses, ...state.usuario.Account.variableExpenses]
      let orderByAmount = payload === 'menorAMayor'
        ? orderExpenses.sort((a, b) => a.amount - b.amount)
        : orderExpenses.sort((a, b) => b.amount - a.amount)
      return {
        ...state,
        allExpenses: orderByAmount
      }
    },
    inputsFilterByMonth: (state, { payload }) => {
      console.log({payload})
      const allInputsFilter = [...state.usuario.Account.monthlyInput, ...state.usuario.Account.extraInput]
      //                                                                             2022-01-05  === 01
      const inpFilter: Entries[] = allInputsFilter.filter((entrie: Entries) => entrie.date.split("-")[1] === payload)
      console.log({inpFilter})
      const inpOrder = inpFilter.sort((a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2]))
      return {
        ...state,
        allInputs: inpOrder
      }
    },
    inputsOrderByAmount: (state, { payload }) => {
      const orderInputs = state.allInputs.length // si no hay nada en el estado anterior devuelve de todos los meses un ordenamiento
      ? state.allInputs
      : [...state.usuario.Account.monthlyInput, ...state.usuario.Account.extraInput];
      let orderByAmount = payload === 'menorAMayor'
        ? orderInputs.sort((a, b) => a.amount - b.amount)
        : orderInputs.sort((a, b) => b.amount - a.amount)
      return {
        ...state,
        allInputs: orderByAmount
      }
    },
    inputsFilterByFrequency: (state, { payload }) => {
      const inputsByFrequency = payload === 'fijo'
        ? [...state.usuario.Account.monthlyInput]
        : [...state.usuario.Account.variableInput]
      return {
        ...state,
        allinputs: inputsByFrequency
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "loading"
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [registerUser.rejected]: (state) => {
      state.status = "failed"
    },
    [loginUser.pending]: (state) => {
      state.status = "loading"
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [loginUser.rejected]: (state) => {
      state.status = "failed"
    },
    [googleLogin.pending]: (state) => {
      state.status = "loading"
    },
    [googleLogin.fulfilled]: (state, { payload }) => {
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
    [getUserInfo.fulfilled]: (state, { payload }) => {
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
    [addDato.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [addDato.rejected]: (state) => {
      state.status = "failed"
    },
    [deleteDato.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteDato.fulfilled]: (state, { payload }) => {
      state.status = 'success'
      state.usuario = payload
    },
    [deleteDato.rejected]: (state) => {
      state.status = 'failed'
    },
    [uploadImage.pending]: (state) => {
      state.status = "loading"
    },
    [uploadImage.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario[payload.key] = payload.value
    },
    [uploadImage.rejected]: (state) => {
      state.status = "failed"
    },
  }
})
export const { 
  inputsFilterByMonth, 
  getAllInputs, 
  getAllExpenses, 
  inputsOrderByAmount, 
  expensesFilterByFrequency,
  expensesOrderByAmount,
  expensesFilterByMonth,
  inputsFilterByFrequency
} = reducerSlice.actions;

export default reducerSlice.reducer;