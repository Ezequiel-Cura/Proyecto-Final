import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import user from "redux/reducers/userReducer"
import admin from "redux/reducers/adminReducer/adminReducer"

const reducer = combineReducers({
    user,
    admin
})

const store = configureStore({
    reducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;