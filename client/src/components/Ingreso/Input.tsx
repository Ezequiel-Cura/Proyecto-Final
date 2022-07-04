import React, { useEffect }  from 'react';
import InputLanding from './InputLanding';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { renderInput } from 'redux/reducers/userReducer';
import InputTable from './InputTable';

export default function Input() {
  const { status, renderInputs } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth()+1) : String(new Date().getMonth())}`

  useEffect(() => {
    if (status === 'success'){
      dispatch(renderInput(date))
    }
  }, [dispatch])

  return (
    <div>
      <InputTable/>
    </div>
  )
}