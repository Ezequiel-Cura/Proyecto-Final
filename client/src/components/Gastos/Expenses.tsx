import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ExpensesTable from "./ExpensesTable";
import ExpensesLanding from "./ExpensesLanding";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {  } from 'redux/reducers/userReducer';

export default function Expenses() {
<<<<<<< HEAD
  const { allOutputs, status } = useAppSelector(state => state.user);
=======
  const { renderOutputs, status } = useAppSelector(state => state.user);
>>>>>>> 630b41b7de7b531417ca8de11cf3ea8269511058
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      // dispatch()
    }
  }, [status])
  
  return (
    <div>
<<<<<<< HEAD
        { allOutputs.length > 0 ? <ExpensesTable/> : <ExpensesLanding/> }
=======
        {/* { allOutputs.length > 0 ? <ExpensesTable/> : <ExpensesLanding/> } */}
>>>>>>> 630b41b7de7b531417ca8de11cf3ea8269511058
    </div>
  )
}
