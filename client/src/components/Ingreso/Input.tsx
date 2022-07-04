import React, { useEffect }  from 'react';
import ConDatos from "./InputTable";
import InputLanding from './InputLanding';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllInputs } from 'redux/reducers/userReducer';

export default function Input() {
  const { allInputs, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllInputs())
    }
  }, [status])

  return (
    <div>
      { allInputs.length > 0 ? <ConDatos/> : <InputLanding/>}
    </div>
  )
}