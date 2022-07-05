import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ExpensesTable from "./ExpensesTable";
import ExpensesLanding from "./ExpensesLanding";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {  } from 'redux/reducers/userReducer';

export default function Expenses() {
  const { renderOutputs, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      // dispatch()
    }
  }, [status])
  
  return (
    <div>
        {/* { allOutputs.length > 0 ? <ExpensesTable/> : <ExpensesLanding/> } */}
    </div>
  )
}
