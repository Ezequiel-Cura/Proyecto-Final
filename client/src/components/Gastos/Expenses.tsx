import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ExpensesLanding from "./ExpensesLanding";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpensesTable from './ExpensesTable';

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
        { renderOutputs.length > 0 ? <ExpensesTable/> : <ExpensesLanding/> }
    </div>
  )
}
