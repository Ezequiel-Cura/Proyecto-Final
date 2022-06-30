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
  usuario: any   
  status: 'idle' | 'loading' | 'success' | 'failed'
  allInputs: Entries[] | [],
  allExpenses: Entries[] | [],
  totalExpensesMonth: number,
  totalInputsMonth: number
}

const initialState: User = {
  usuario: {
    _id: '',
    userName: '',
    lastName: '',
    email: '',
    password: '',
    Saving: [],
    CategoriesExpenses: [],
    CategoriesInputs: [],
    Account: {
      monthlyInput: [],
      extraInput: [],
      monthlyExpenses: [],
      variableExpenses: [],
    },
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
      console.log(ingreso, 'reducer')
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
    totalInput: (state) => {
      let curAllInputState = current(state);
      let reduceTotal = 0
      curAllInputState.allInputs.forEach( entrie => reduceTotal+= entrie.amount)
      state.totalInputsMonth = reduceTotal
    },
    totalExpenses: (state) => {
      let curAllInputState = current(state);
      let reduceTotalExp = 0
      curAllInputState.allExpenses.forEach( entrie => reduceTotalExp+= entrie.amount)
      state.totalExpensesMonth = reduceTotalExp
    },
    expensesFilterByMonth: (state, { payload }) => {
      let curExpState = current(state)
      const allExpensesFilter = [...curExpState.usuario.Account.monthlyExpenses, ...curExpState.usuario.Account.variableExpenses]
      const expFilter: Entries[] = allExpensesFilter.filter((entrie: Entries) => entrie.date.split("-")[1] === payload)

      const expOrder = expFilter.sort((a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2]))
      return {
        ...state,
        allExpenses: expOrder
      }
    },
    expensesFilterByFrequency: (state, { payload }) => {
      let currExpSta = current(state)
      const expensesByFrequency = payload === 'fijo'
        ? [...currExpSta.usuario.Account.monthlyExpenses]
        : [...currExpSta.usuario.Account.variableExpenses]
      return {
        ...state,
        allExpenses: expensesByFrequency
      }
    },
    expensesOrderByAmount: (state, { payload }) => {
      let currStateExpAmount = current(state)
      const orderExpenses: Entries[] = [...currStateExpAmount.allInputs];
      let orderByAmount = payload === 'menorAMayor'
        ? orderExpenses.sort((a, b) => a.amount - b.amount)
        : orderExpenses.sort((a, b) => b.amount - a.amount)
      return {
        ...state,
        allExpenses: orderByAmount
      }
    },
    inputsFilterByMonth: (state, { payload }) => {

      let currentInputState = current(state)
      const allInputsFilter = [...currentInputState.usuario.Account.monthlyInput, ...currentInputState.usuario.Account.extraInput]
      //                                                                             2022-01-05  === 01
      const inpFilter: Entries[] = allInputsFilter.filter((entrie: Entries) => entrie.date.split("-")[1] === payload)
      const inpOrder = inpFilter.sort((a, b) => parseInt(a.date.split("-")[2]) - parseInt(b.date.split("-")[2]))
      return {
        ...state,
        allInputs: inpOrder
      }
    },
    inputsOrderByAmount: (state, { payload }) => {
      let currStateInpAmount = current(state)
      const orderInputs: Entries[] = [...currStateInpAmount.allInputs];
      let orderByAmount = payload === 'menorAMayor'
        ? orderInputs.sort((a, b) => a.amount - b.amount)
        : orderInputs.sort((a, b) => b.amount - a.amount)
      return {
        ...state,
        allInputs: orderByAmount
      }
    },
    inputsFilterByFrequency: (state, { payload }) => {
      let currentInputFrequency = current(state);
      let monthly = currentInputFrequency.usuario.Account.monthlyInput
      let extra = currentInputFrequency.usuario.Account.extraInput

      const inputsByFrequency = payload === 'fijo'
        ? monthly       
        : extra   

      return {
        ...state,
        allInputs: inputsByFrequency
      }
    },
    filterInputByCategory (state, {payload}) {
      let currentInputState = current(state)
      let allEntriesOfInputs = [...currentInputState.usuario.Account.monthlyInput, ...currentInputState.usuario.Account.extraInput]
      let filterInputByCategory = allEntriesOfInputs.filter( (obj : Entries) => payload === obj.category)
      state.allInputs = filterInputByCategory
    },
    filterExpensesByCategory (state, {payload}) {
      let curExpState = current(state)
      const allEntriesOfExpenses = [...curExpState.usuario.Account.monthlyExpenses, ...curExpState.usuario.Account.variableExpenses]
      let filterExpenseByCategory = allEntriesOfExpenses.filter( (obj : Entries) => payload === obj.category)
      state.allExpenses = filterExpenseByCategory
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
  totalInput,
  totalExpenses,
  getAllInputs, 
  getAllExpenses, 
  inputsOrderByAmount, 
  expensesOrderByAmount,
  expensesFilterByMonth,
  expensesFilterByFrequency,
  inputsFilterByFrequency,
  filterExpensesByCategory,
  filterInputByCategory,
} = reducerSlice.actions;

export default reducerSlice.reducer;
