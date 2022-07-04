<<<<<<< HEAD
import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ConDatosGastos from "./ExpensesTable";
import ExpensesLanding from "./ExpensesLanding";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { getAllExpenses } from 'redux/reducers/userReducer';

export default function Expenses() {
  const { status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      // dispatch(getAllExpenses())
    }
  }, [status])
  
  return (
    <div>
        {/* { allOutputs.length > 0 ? <ExpensesTable/> : <ExpensesLanding/> } */}
    </div>
  )
}
=======
import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ConDatosGastos from "./ExpensesTable";
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
>>>>>>> 26a858e7e1200fa57e5c7d62b38e8bfbdf5c3aef
