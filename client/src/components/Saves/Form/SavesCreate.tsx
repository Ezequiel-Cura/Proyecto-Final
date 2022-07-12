import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addDato } from 'redux/reducers/userReducer/actions/addDato';
import { addSaving } from 'redux/reducers/userReducer/actions/addSaving';
import style from '../PopUpForm.module.css'

export default function SavesCreate(props : any) {
  const dispatch = useAppDispatch();
  const { usuario, status,  } = useAppSelector(state => state.user);
  const { open, setOpen } = props;
  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    depositPlace: string,
    currency: string,
  }

  const [input1, setInput] = useState<SavingUser>({
    name: '', 
    start: '', 
    end: '', 
    goal: 0,
    depositPlace: '',
    currency: ''
  });

  const form = {
    value: input1
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input1,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit1(e: React.FormEvent<HTMLFormElement>) {         //-----Form 1 
    e.preventDefault();
    dispatch(addSaving(form));
  }

  return (
    <div className={style.wrapperForm}>
      <form onSubmit={handleSubmit1}>
              <h2>Agrega una casilla de ahorro</h2>
              <br/>
              <label>Nombre de la casilla: </label>
              <input
                type='text'
                name='name'
                value={input1.name}
                placeholder='Agrega un nombre'
                className={style.inputText}
                onChange={handleChange}
              >
              </input>
              <br/>
              <label>Fecha de inicio: </label>
              <input
                type='date'
                name='start'
                value={input1.start}
                placeholder='Agrega una fecha'
                className={style.inputDate}
                onChange={handleChange}
              >
              </input>
              <label>Fecha limite: </label>
              <input
                type='date'
                name='end'
                value={input1.end}
                placeholder='Agrega una descripcion'
                className={style.inputDate}
                onChange={handleChange}
              >
              </input>
              <br/>
              <label>Deposito: </label>
              <input
                type='text'
                name='depositPlace'
                value={input1.depositPlace}
                placeholder='Donde esta alojado'
                className={style.inputText}
                onChange={handleChange}
              >
              </input>
              <br/>
              <label>Meta: $ </label>
              <input
                type='number'
                name='goal'
                min='0'
                value={input1.goal}
                placeholder='Agrega un monto'
                className={style.inputText}
                onChange={handleChange}
              >
              </input>
              <br/>
              <label className={style.labelCurrent}>Selecciona el tipo de moneda: </label>
              <div className={style.wrapperAllCurrents}>
                <div className={style.wrapperCurrentsA}>
                  <input type="radio" name="currency" value="ARS" className={style.inputCurrent} onChange={handleChange}/>Peso Argentino
                  <br/>
                  <input type="radio" name="currency" value="UYU" className={style.inputCurrent} onChange={handleChange}/>Peso Uruguayo
                  <br/>
                  <input type="radio" name="currency" value="USD" className={style.inputCurrent} onChange={handleChange}/>Dolar
                  <br/>
                  <input type="radio" name="currency" value="EUR" className={style.inputCurrent} onChange={handleChange}/>Euro
                </div>
                <br/>
                <div className={style.wrapperCurrentsB}>
                  <input type="radio" name="currency" value="LBP" className={style.inputCurrent} onChange={handleChange}/>Libra Esterlina
                  <br/>
                  <input type="radio" name="currency" value="JPY" className={style.inputCurrent} onChange={handleChange}/>Yen
                  <br/>
                  <input type="radio" name="currency" value="CHF" className={style.inputCurrent} onChange={handleChange}/>Franco Suizo
                </div>
              </div>
              <button type='submit' onClick={()=> setOpen(!open)}>Agregar</button>
      </form>
    </div>
  )
}