import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from 'axios';

import { registerUser } from '../modules/registerUser'

import { loginUser } from '../modules/loginUser'

import { googleLogin } from '../modules/googleLogin'

import { logout } from '../modules/logout'

import { getUserInfo } from '../modules/getUserInfo'

import { addDato } from '../modules/addDato'

import { deleteDato } from '../modules/deleteDato'

import { addCategory } from '../modules/addCategory'

import { deleteCategory } from '../modules/deleteCategory'

import { addSaving } from '../modules/addSaving'

import { deleteSaving } from '../modules/deleteSaving'


export const updatePersonalInfo: any = createAsyncThunk("user/updatePersonalInfo", 
async (info: any)=> {
  const {data} = await axios.put("/user/update", info)
  return data
})

export const uploadImage: any = createAsyncThunk("user/uploadImage",
  async (info: any) => {
    let formData = new FormData();
    formData.append("file", info.img)
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET as string | Blob)
    const result = await axios.post("https://api.cloudinary.com/v1_1/finanzas-personales/image/upload",
      formData, { withCredentials: false });
    const { data } = await axios.put("/user/update", { id: info.id, key: "avatar", value: result.data.url });
    return data
  });

//---------------------------------

interface Entries {
  date: string,
  end?:string,
  frequency?: string,
  description: string,
  category: string,
  amount: number
}
interface User {
  usuario: any
  status: 'idle' | 'loading' | 'success' | 'failed'
  allInputs: Entries[] | [],
  allOutputs:  Entries[] | [],
  renderInputs: Entries[] | [],
  renderOutputs: Entries[] | [],
  totalOutputsMonth: number,
  totalInputsMonth: number

}

const initialState: User = {
  usuario: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    savings: [],

    monthly: {
      input: [],
      output: []
    },
    extra: {
      input: [],
      output: []
    },
    categories: []
  },
  status: 'idle',
  allInputs: [],
  allOutputs: [],
  renderInputs: [],
  renderOutputs: [],
  totalOutputsMonth: 0,
  totalInputsMonth: 0

}


const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    renderInput: (state, { payload }) => {
      try{
        // Bring monthly inputs
        const month = state.usuario.monthly.input.filter((e:Entries) => `${e.date.split('-')[0]}-${e.date.split('-')[1]}` === payload ) 
        // const monthFilter = month ? month.filter((e: Entries) => e.date.split('-')[0] + e.date.split('-')[1] === payload) : []
        const monthEntries = month.length > 0 ? month.map((e:Entries) => e = {...e, frequency: 'monthly'} ) : []
      // const month = state.usuario.monthly.input.slice().map((e:Entries) => e = {...e, frequency: 'monthly'} ) || []
      // Bring extra inputs
      const extraIndex = state.usuario.extra.input.map((e:Entries) => e.date).indexOf(payload) || 0
      const extra = extraIndex < 0 ? [] : state.usuario.extra.input[extraIndex].entries.map((e: Entries) => e = {...e, frequency: 'extra'})
        state.renderInputs =  [...monthEntries, ...extra]
        state.allInputs = [...monthEntries, ...extra]
      }catch(e){
        console.log(e)
      }
    },
    totalInput: (state) => {
      let reduceTotal = 0
      state.renderInputs.forEach( entrie => reduceTotal+= entrie.amount)
      state.totalInputsMonth = reduceTotal
    },
    renderOutput: (state, { payload }) => {
        try
        {    // Bring monthly inputs
          const month = state.usuario.monthly.output.filter((e:Entries) => `${e.date.split('-')[1]}` === payload ) || []
          // const monthFilter = month ? month.filter((e: Entries) => e.date.split('-')[0] + e.date.split('-')[1] === payload) : []
          const monthEntries = month.length > 0 ? month.map((e:Entries) => e = {...e, frequency: 'monthly'} ) : []
            // const month = state.usuario.monthly.output.slice().map((e:Entries) => e = {...e, frequency: 'monthly'} ) || []
      
            // Bring extra inputs
            const extraIndex = state.usuario.extra.output.map((e:Entries) => e.date).indexOf(payload) || 0
            const extra = extraIndex < 0 ? [] : state.usuario.extra.output[extraIndex].entries.map((e: Entries) => e = {...e, frequency: 'extra'})  
              state.renderOutputs = [...monthEntries, ...extra]
              state.allOutputs = [...monthEntries, ...extra]
            }catch(e){
              console.log(e)
            }
    },
    totalOutput: (state) => {
      let reduceTotal = 0
      state.renderOutputs.forEach( entrie => reduceTotal+= entrie.amount)
      state.totalOutputsMonth = reduceTotal;
    },
    outputsFilterByFrequency: (state, { payload }) => {
      const outputsByFrequency = payload === 'monthly'
        ? state.allOutputs.filter((e: Entries) => e.frequency === 'monthly')
        : payload === 'extra'
        ? state.allOutputs.filter((e: Entries) => e.frequency === 'extra')
        : state.allOutputs;
        state.renderOutputs = outputsByFrequency
    },

    expensesOrderByAmount: (state, { payload }) => {
      const orderExpenses: Entries[] = [...state.renderOutputs];
      let orderByAmount = payload === 'menorAMayor'
        ? orderExpenses.sort((a, b) => a.amount - b.amount)
        : orderExpenses.sort((a, b) => b.amount - a.amount)
         state.renderOutputs = orderByAmount
    },

    inputsFilterByFrequency: (state, { payload }) => {
      const inputsByFrequency = payload === 'monthly'
        ? state.allInputs.filter((e: Entries) => e.frequency === 'monthly')
        : payload === 'extra'
        ? state.allInputs.filter((e: Entries) => e.frequency === 'extra')
        : state.allInputs;
        state.renderInputs = inputsByFrequency
    },
    inputsFilterByMonth: (state, { payload }) => {
      const month = state.usuario.monthly.input.filter((e:Entries) => `${e.date.split('-')[1]}` === payload ) || []
      // const monthFilter = month ? month.filter((e: Entries) => e.date.split('-')[0] + e.date.split('-')[1] === payload) : []
      const monthEntries = month.length > 0 ? month.map((e:Entries) => e = {...e, frequency: 'monthly'} ) : []
      const extraIndex = state.usuario.extra.input.find((e:Entries) => e.date.split('-')[1] === payload)

      if(!extraIndex){
        state.renderInputs = [...monthEntries]
       } else{
        const extraEntries = extraIndex.entries.map((e: Entries) => e = {...e, frequency: 'extra'}) 
         state.renderInputs = [...monthEntries, ...extraEntries]
       }
    },  
    inputsOrderByAmount: (state, { payload }) => {
      const orderInputs: Entries[] = [...state.allInputs];
      let orderByAmount = payload === 'menorAMayor'
        ? orderInputs.sort((a, b) => a.amount - b.amount)
        : orderInputs.sort((a, b) => b.amount - a.amount)
        state.renderInputs = orderByAmount;
    },

    expensesFilterByMonth: (state, { payload }) => {
      const month = state.usuario.monthly.output.filter((e:Entries) => `${e.date.split('-')[1]}` === payload ) || []
      // const monthFilter = month ? month.filter((e: Entries) => e.date.split('-')[0] + e.date.split('-')[1] === payload) : []
      const monthEntries = month.length > 0 ? month.map((e:Entries) => e = {...e, frequency: 'monthly'} ) : []
      const extraIndex = state.usuario.extra.output.find((e:Entries) => e.date.split('-')[1] === payload)
      if(!extraIndex){
        state.renderOutputs = [...monthEntries]
       } else{
        const extraEntries = extraIndex.entries.map((e: Entries) => e = {...e, frequency: 'extra'})  
         state.renderOutputs = [...monthEntries, ...extraEntries]
       }
    },

    filterInputByCategory (state, {payload}) {
      let filterInputByCategory = payload === 'default' 
      ? state.allInputs
      : state.allInputs.filter( (obj : Entries) => payload === obj.category)
      state.renderInputs = filterInputByCategory
    },

    filterExpensesByCategory (state, {payload}) {
      let filterExpenseByCategory = payload === 'default' 
      ? state.allOutputs
      : state.allOutputs.filter( (obj : Entries) => payload === obj.category)
      state.renderOutputs = filterExpenseByCategory
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "loading"
    },
    [registerUser.fulfilled]: (state) => {
      state.status = "success"
    },
    [registerUser.rejected]: (state) => {
      state.status = "failed"
    },
    [loginUser.pending]: (state) => {
      state.status = "loading"
    },
    [loginUser.fulfilled]: (state) => {
      state.status = "success"
    },
    [loginUser.rejected]: (state) => {
      state.status = "failed"
    },
    [googleLogin.pending]: (state) => {
      state.status = "loading"
    },
    [googleLogin.fulfilled]: (state) => {
      state.status = "success"
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
    [updatePersonalInfo.pending]: (state) => {
      state.status = "loading"
    },
    [updatePersonalInfo.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario[payload.key] = payload.value
    },
    [updatePersonalInfo.rejected]: (state) => {
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
    [addCategory.pending]: (state) => {
      state.status = "loading"
    },
    [addCategory.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [addCategory.rejected]: (state) => {
      state.status = "failed"
    },
    [deleteCategory.pending]: (state) => {
      state.status = "loading"
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [deleteCategory.rejected]: (state) => {
      state.status = "failed"
    },
    [addSaving.pending]: (state) => {
      state.status = "loading"
    },
    [addSaving.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [addSaving.rejected]: (state) => {
      state.status = "failed"
    },
    [deleteSaving.pending]: (state) => {
      state.status = "loading"
    },
    [deleteSaving.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario = payload
    },
    [deleteSaving.rejected]: (state) => {
      state.status = "failed"
    },
  }
})
export const {
  totalInput,
  renderOutput,
  renderInput,
  totalOutput,
  outputsFilterByFrequency,
  inputsFilterByMonth,
  inputsOrderByAmount,
  expensesOrderByAmount,
  expensesFilterByMonth,
  inputsFilterByFrequency,
  filterExpensesByCategory,
  filterInputByCategory,
} = reducerSlice.actions;

export default reducerSlice.reducer;

