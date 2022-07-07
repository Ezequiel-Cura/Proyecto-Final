import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ExpensesLanding from "./ExpensesLanding";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpensesTable from './ExpensesTable';
import { renderOutput } from 'redux/reducers/userReducer/userReducer';

export default function Expenses() {
  const { renderOutputs, status, allOutputs } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  let currentDate = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth()+1) : String(new Date().getMonth())}`
  useEffect(() => {
    if (status === 'success'){
      dispatch(renderOutput(currentDate))
    }
  }, [status])
  
  return (
    <div>
        { renderOutputs.length > 0 || allOutputs.length > 0 ? <ExpensesTable/> : <ExpensesLanding/> }
    </div>
  )
}
