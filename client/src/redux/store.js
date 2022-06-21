import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/reducers/userReducer"

const reducer = combineReducers({
    userReducer
})

const store = configureStore({
    reducer,
})

export default store;