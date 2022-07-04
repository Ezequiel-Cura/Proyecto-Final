<<<<<<< HEAD
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
=======
import React, { useEffect }  from 'react';
import InputLanding from './InputLanding';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { renderInput } from 'redux/reducers/userReducer';
import InputTable from './InputTable';

export default function Input() {
  const { renderInputs, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  let currentDate = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth()+1) : String(new Date().getMonth())}`

  useEffect(() => {
    if (status === 'success'){
      dispatch(renderInput(currentDate))
    }
  }, [status])

  return (
    <div>
      { renderInputs.length > 0 ? <InputTable/> : <InputLanding/> }
    </div>
  )
>>>>>>> 26a858e7e1200fa57e5c7d62b38e8bfbdf5c3aef
}