import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import user from "redux/reducers/userReducer/userReducer"
import admin from "redux/reducers/adminReducer/adminReducer"
import common from "redux/reducers/commonReducer/commonReducer"

const reducer = combineReducers({
    user,
    admin,
    common
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