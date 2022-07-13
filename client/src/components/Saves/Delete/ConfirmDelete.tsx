import React from 'react';
import { useAppDispatch } from 'redux/hooks';
import { deleteSaving } from 'redux/reducers/userReducer/actions/deleteSaving';
import style from '../Css/PopUpForm.module.css'

export default function ConfirmDelete(props : any) {
  const dispatch = useAppDispatch();
  const { open, setOpen, data } = props;

  function handleDelete(e : any) {
    dispatch(deleteSaving(e))
    setOpen(!open)
  }

  return (
    <div className={style.wrapperForm}>
        <p>¿Seguro que quiere eliminarla?</p>
        <button onClick={() => handleDelete(data)}>Confirmar</button>
    </div>
  )
}