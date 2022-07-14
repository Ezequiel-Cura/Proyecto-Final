import { createSlice, current } from "@reduxjs/toolkit";
import { registerUser } from './actions/registerUser'
import { loginUser } from './actions/loginUser'
import { googleLogin } from './actions/googleLogin'
import { logout } from './actions/logout'
import { getUserInfo } from './actions/getUserInfo'
import { addDato } from './actions/addDato'
import { deleteDato } from './actions/deleteDato'
import { addCategory } from './actions/addCategory'
import { deleteCategory } from './actions/deleteCategory'
import { getCurrency } from "./actions/getCurrency";
import { addSaving } from './actions/addSaving'
import { deleteSaving } from './actions/deleteSaving'
import addReview from "./actions/addReview";
import deleteReview from "./actions/deleteReview";
import sendSupportMessage from "./actions/sendSupportMessages";
import reportReview from "./actions/reportReview";
import { getCryptoList } from "./actions/getCryptoList";
import { convertCrypto } from "./actions/convertCrypto";
import deleteAccount from "./actions/deleteAccount";
import uploadImage from "./actions/uploadImage";
import updatePersonalInfo from "./actions/updatePersonalInfo";

const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

interface Entries {
  date: string,
  end?: string,
  frequency?: string,
  description: string,
  category: string,
  amount: number,
}
interface Extra{
  date: string,
  entries: Entries[]
}
interface User {
  usuario: any,
  status: 'idle' | 'loading' | 'success' | 'failed' | any
  allInputs: Entries[] | [],
  allOutputs: Entries[] | [],
  renderInputs: Entries[] | [],
  renderOutputs: Entries[] | [],
  renderSavings: Entries [] | [],
  totalOutputsMonth: number,
  totalInputsMonth: number,
  totalSaving: number,
  savingGoalCompleted: boolean,
  options: any
  dataCurrency: any,
  cryptoList: any
  cryptoData: any
}

const initialState: User = {
  usuario: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    savings: [],
    review: {
      text: "",
      rating: 0
    },
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
  options: {
    frequency: 'default',
    category: 'default',
    month: '',
    year: new Date().getFullYear().toString()
  },
  status: 'idle',
  allInputs: [],
  allOutputs: [],
  renderInputs: [],
  renderOutputs: [],
  renderSavings: [],
  totalOutputsMonth: 0,
  totalInputsMonth: 0,
  totalSaving: 0,
  savingGoalCompleted: false,
  dataCurrency: {},
  cryptoList: [],
  cryptoData: {}
}

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    renderInput: (state, { payload }) => {
      try {
        // Bring monthly inputs

        const month = state.usuario.monthly.input.filter((e: Entries) => e ? `${e.date.split('-')[0]}-${e.date.split('-')[1]}` === payload : '')  || []
        const monthEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []
       
        // Bring extra inputs
        const extraIndex = state.usuario.extra.input.map((e: Extra) => e.date).indexOf(payload) || 0
        const extra = extraIndex < 0 ? [] : state.usuario.extra.input[extraIndex].entries.map((e: Entries) => e = { ...e, frequency: 'extra' }).map((e: Entries) => e = { ...e, date: e.date.split("T")[0] })

        const sortInputs = [...monthEntries, ...extra].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        state.renderInputs = sortInputs;
        state.allInputs = sortInputs;
      } catch (e) {
      }
    },
    totalInput: (state) => {
      let reduceTotal = 0
      state.renderInputs.forEach(entrie => reduceTotal += entrie.amount)
      state.totalInputsMonth = reduceTotal
    },
    renderOutput: (state, { payload }) => {
      try {    // Bring monthly inputs
        const month = state.usuario.monthly.output.filter((e: Entries) => `${e.date.split('-')[0]}-${e.date.split('-')[1]}` === payload)  || []

        // const monthFilter = month ? month.filter((e: Entries) => e.date.split('-')[0] + e.date.split('-')[1] === payload) : []
        const monthEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []

        // Bring extra inputs
        const extraIndex = state.usuario.extra.output.map((e: Extra) => e.date).indexOf(payload) || 0
        const extra = extraIndex < 0 ? [] : state.usuario.extra.output[extraIndex].entries.map((e: Entries) => e = { ...e, frequency: 'extra' }).map((e: Entries) => e = { ...e, date: e.date.split("T")[0] })
        const sortOutputs = [...monthEntries, ...extra].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        state.renderOutputs = sortOutputs;
        state.allOutputs = sortOutputs;
      } catch (e) {
      }
    },
    totalOutput: (state) => {
      let reduceTotal = 0
      state.renderOutputs.forEach(entrie => reduceTotal += entrie.amount)
      state.totalOutputsMonth = reduceTotal;
    },
    totalSave: (state, {payload}) => {
      let total = 0;
      
      const currency = current(state.usuario)
      const month = currency.monthly.output.filter((e: Entries) => e.description === payload.name) || []
      const monthEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []

      const extra = currency.extra.output.map( (e: Extra) => e.entries).flat(Infinity)
      const extraFilter = extra.filter((e: Entries) => e.description === payload.name) || []
      const extraFrequency = extraFilter.length > 0 ? extraFilter.map((e: Entries) => e = { ...e, frequency: 'extra' }) : []

      //TOTAL SAVINGS POR AQUI
      const savingsFilter = [...monthEntries, ...extraFrequency]
      state.renderSavings = savingsFilter
      savingsFilter.forEach( (el: Entries) => total += el.amount)
      state.totalSaving = total
      const detailIndex = state.usuario.savings.map( (e: any) => e._id).indexOf(payload._id) || 0
      state.usuario.savings[detailIndex].currentAmount = total
      total >= state.usuario.savings[detailIndex].goal 
      ? state.savingGoalCompleted = true
      : state.savingGoalCompleted = false
    },
    clearCurrency: (state) => {
      state.dataCurrency = {}
    },
    setGoalSaves: (state) => {
      state.savingGoalCompleted = false
    },
    changeOptions: (state, { payload }) => {
      state.options[payload[0]] = payload[1]
    },
    clearChangeOptions: (state) => {
      state.options = {frequency: 'default', category: 'default', month: '', year: date.split('-')[0]}
    },
    filterOutputByOptions: (state) => {
      //Year
      if (!state.options.year) {
        const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`
        const currState = current(state.usuario)
        const month = state.usuario.monthly.output.filter((e: Entries) => `${e.date.split('-')[0]}` === `${date.split('-')[0]}`) || []
        const monthEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []
        const extraIndex = currState.extra.output.filter((e: Extra) => `${e.date.split('-')[0]}` === `${date.split('-')[0]}`)
       
        if (extraIndex.length < 1) {
          state.renderOutputs = [...monthEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        } else {         //[{date, entries},{}]

          const extraEntries = extraIndex.map((e: Extra) => e.entries ).flat(Infinity).map((e: Entries) => e = { ...e, frequency: 'extra' })
          state.renderOutputs = [...monthEntries, ...extraEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        }
      } else {
        const month = state.usuario.monthly.output.filter((e: Entries) => `${e.date.split('-')[0]}` === state.options.year) || []
        const monthEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []
        const currState = current(state.usuario)
        const extraIndex = currState.extra.output.filter((e: Extra) => `${e.date.split('-')[0]}` === state.options.year)
        
        if (extraIndex.length < 1) {
          state.renderOutputs = [...monthEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        } else {
          const extraEntries = extraIndex.map((e: Extra) => e.entries ).flat(Infinity).map((e: Entries) => e = { ...e, frequency: 'extra' })
          state.renderOutputs = [...monthEntries, ...extraEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        }
      }
      //Month
      if (!!state.options.month) {
        const month = state.renderOutputs.filter((e: Entries) => `${e.date.split('-')[1]}` === state.options.month) || []
        state.renderOutputs = [...month]
      } else{
        const month = state.renderOutputs.filter((e: Entries) => `${e.date.split('-')[1]}` === `${date.split('-')[1]}`) || []
        const allOuts = [...month] 
        if(allOuts.length < 1){
          state.renderOutputs = state.renderOutputs.filter((e: Entries) => `${e.date.split('-')[1]}` === '01')
        } else{
          state.renderOutputs = allOuts
        }
      }
      //Frequency
      switch (state.options.frequency) {
        case 'monthly': {
          state.renderOutputs = state.renderOutputs.filter((entries: Entries) => entries.frequency === 'monthly')
          break
        }
        case 'extra': {
          state.renderOutputs = state.renderOutputs.filter((entries: Entries) => entries.frequency === 'extra')
          break
        }
        case 'default': {
          break
        }
        default: {
          break
        }
      }
      //Category
      if (state.options.category === 'default') {
        return;
      } else {
        state.renderOutputs = state.renderOutputs.filter((entries: Entries) => state.options.category === entries.category)
      }
    },
    resetCryptoData: (state) => {
      state.cryptoData = {}
    },
    resetCryptoList: (state) => {
      state.cryptoList = []
    },
    searchCryptoByName: (state, {payload}) => {
      const filterList = state.cryptoList.filter((crypto: any) => crypto.name.toLowerCase() === payload.toLowerCase())
      state.cryptoList = filterList
    },
    filterInputByOptions: (state) => {
      
      if (!state.options.year) {
        const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`
        
        const month = state.usuario.monthly.input.filter((e: Entries) => `${e.date.split('-')[0]}` === `${date.split('-')[0]}`) || []
        const yearEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []
        const currState = current(state.usuario)
        const extraIndex = currState.extra.input.filter((e: Extra) => `${e.date.split('-')[0]}` === `${date.split('-')[0]}`)
        
        
        if (extraIndex.length < 1) {
          state.renderInputs = [...yearEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        } else {
          const extraEntries = extraIndex.map((e: Extra) => e.entries ).flat(Infinity).map((e: Entries) => e = { ...e, frequency: 'extra' })
          state.renderInputs = [...yearEntries, ...extraEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        }

      } else {
        const month = state.usuario.monthly.input.filter((e: Entries) => `${e.date.split('-')[0]}` === state.options.year) || []
        const yearEntries = month.length > 0 ? month.map((e: Entries) => e = { ...e, frequency: 'monthly' }) : []
        const currState = current(state.usuario)
        const extraIndex = currState.extra.input.filter((e: Extra) => `${e.date.split('-')[0]}` === state.options.year)
        if (extraIndex.length < 1) {
          state.renderInputs = [...yearEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        } else {
          const extraEntries = extraIndex.map((e: Extra) => e.entries ).flat(Infinity).map((e: Entries) => e = { ...e, frequency: 'extra' })
          state.renderInputs = [...yearEntries, ...extraEntries].sort((a, b) => b.date.split('-')[2] - a.date.split('-')[2])
        }
      }
      //Month
      if (!!state.options.month) {
        const month = state.renderInputs.filter((e: Entries) => `${e.date.split('-')[1]}` === state.options.month) || []
        state.renderInputs = [...month]
      } else{
        const month = state.renderInputs.filter((e: Entries) => `${e.date.split('-')[1]}` === `${date.split('-')[1]}`) || []
        const allInputs = [...month] 
       if(allInputs.length < 1){
        state.renderInputs = state.renderInputs.filter((e: Entries) => `${e.date.split('-')[1]}` === '01')
       } else{
         state.renderInputs = allInputs
       }
      }
      //Frequency
      switch (state.options.frequency) {
        case 'monthly': {
          state.renderInputs = state.renderInputs.filter((entries: Entries) => entries.frequency === 'monthly')
          break
        }
        case 'extra': {
          state.renderInputs = state.renderInputs.filter((entries: Entries) => entries.frequency === 'extra')
          break
        }
        case 'default': {
          break
        }
        default: {
          break
        }
      }
      //Category
      if (state.options.category !== 'default') {
        state.renderInputs = state.renderInputs.filter((entries: Entries) => state.options.category === entries.category)
      }
    },
    expensesOrderByAmount: (state, { payload }) => {
      const orderExpenses: Entries[] = [...state.renderOutputs];
      let orderByAmount = payload === 'menorAMayor'
        ? orderExpenses.sort((a, b) => a.amount - b.amount)
        : orderExpenses.sort((a, b) => b.amount - a.amount)
      state.renderOutputs = orderByAmount
    },
    inputsOrderByAmount: (state, { payload }) => {
      const orderInputs: Entries[] = [...state.renderInputs];
      let orderByAmount = payload === 'menorAMayor'
        ? orderInputs.sort((a, b) => a.amount - b.amount)
        : orderInputs.sort((a, b) => b.amount - a.amount)
      state.renderInputs = orderByAmount;
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
      state.status = "CategoryCreated"
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
    [getCurrency.pending]: (state) => {
      state.status = "loading"
    },
    [getCurrency.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.dataCurrency = payload
    },
    [getCurrency.rejected]: (state) => {
      state.status = "failed"
    },
    [addReview.pending]: (state) => {
      state.status = "loading"
    },
    [addReview.fulfilled]: (state, { payload }) => {
      state.status = "success"
      state.usuario.review = payload
    },
    [addReview.rejected]: (state) => {
      state.status = "failed"
    },
    [deleteReview.pending]: (state) => {
      state.status = "loading"
    },
    [deleteReview.fulfilled]: (state) => {
      state.status = "success"
      state.usuario.review = undefined
    },
    [deleteReview.rejected]: (state) => {
      state.status = "failed"
    },
    [sendSupportMessage.pending]: (state) => {
      state.status = "loading"
    },
    [sendSupportMessage.fulfilled]: (state) => {
      state.status = "success"
    },
    [sendSupportMessage.rejected]: (state) => {
      state.status = "failed"
    },
    [getCryptoList.pending]: (state) => {
      state.status = "loading"
    },
    [getCryptoList.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.cryptoList = payload
    },
    [getCryptoList.rejected]: (state) => {
      state.status = "failed"
    },
    [convertCrypto.pending]: (state) => {
      state.status = "loading"
    },
    [convertCrypto.fulfilled]: (state, {payload}) => {
      state.status = "success"
      state.cryptoData = payload
    },
    [convertCrypto.rejected]: (state) => {
      state.status = "failed"
    },
    [reportReview.pending]: (state) => {
      state.status = "loading"
    },
    [reportReview.fulfilled]: (state) => {
      state.status = "success"
    },
    [reportReview.rejected]: (state) => {
      state.status = "failed"
    },
    [deleteAccount.pending]: (state) => {
      state.status = "loading"
    },
    [deleteAccount.fulfilled]: (state) => {
      state.status = "success"
    },
    [deleteAccount.rejected]: (state) => {
      state.status = "failed"
    },
  }
})
export const {
  totalInput,
  renderOutput,
  renderInput,
  clearCurrency,
  setGoalSaves,
  resetCryptoData,
  resetCryptoList,
  searchCryptoByName,
  totalOutput,
  totalSave,
  changeOptions,
  filterOutputByOptions,
  inputsOrderByAmount,
  expensesOrderByAmount,
  filterInputByOptions,
  clearChangeOptions
} = reducerSlice.actions;

export default reducerSlice.reducer;

