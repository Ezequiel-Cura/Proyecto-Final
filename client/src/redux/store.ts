import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "redux/reducers/userReducer"

const reducer = combineReducers({
    userReducer
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