import React, { useEffect }  from 'react';
import InputLanding from './InputLanding';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllInputs } from 'redux/reducers/userReducer';
import InputTable from './InputTable';

export default function Input() {
  const { renderInputs, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllInputs())
    }
  }, [status])

  return (
    <div>
      { renderInputs.length > 0 ? <InputTable/> : <InputLanding/> }
    </div>
  )
}