import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import ConDatosGastos from "./ConDatosGastos";
import SinDatosGastos from "./SinDatosGastos";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllExpenses } from 'redux/reducers/userReducer';

export default function Gastos() {
  const { allExpenses, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllExpenses())
    }
  }, [status])
  
  return (
    <div>
        { allExpenses.length > 0 ? <ConDatosGastos/> : <SinDatosGastos/> }
    </div>
  )
}
