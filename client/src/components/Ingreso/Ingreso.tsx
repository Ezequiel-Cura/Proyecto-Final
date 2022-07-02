import React, { useEffect }  from 'react';
import ConDatos from "./ConDatos";
import SinDatos from './SinDatos';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllInputs, getCurrentMonthInput } from 'redux/reducers/userReducer';

export default function Ingreso() {
  const { allInputs, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllInputs())
    }
  }, [status])

  return (
    <div>
      { allInputs.length > 0 ? <ConDatos/> : <SinDatos/>}
    </div>
  )
}