import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { deleteSaving } from 'redux/reducers/userReducer/actions/deleteSaving';
import style from '../Css/PopUpForm.module.css'

export default function ConfirmDeleteDetail(props : any) {
  const dispatch = useAppDispatch();
  const { data } = props;

  function handleDelete(e : any) {
    dispatch(deleteSaving(e))
  }

  return (
    <div className={style.wrapperForm}>
        <p>¿Seguro que quiere eliminarla?</p>
        <br/>
        <Link to={'/home/saving/add'}>
            <button className={style.buttonDelete} onClick={() => handleDelete(data)}>Confirmar</button>
        </Link>
    </div>
  )
}