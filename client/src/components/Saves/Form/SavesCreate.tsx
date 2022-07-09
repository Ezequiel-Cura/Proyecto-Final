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

  interface addSave {
    category: string,
    description: string,
    amount: number,
  }

  const [input2, setInput2] = useState<addSave>({
    category: 'extra',
    description: '',
    amount: 0
  })

  function handleSubmit2(e: React.FormEvent<HTMLFormElement>) {         //-----Form 2, agregar ingreso
    e.preventDefault();
    console.log(form, 'form agregar ahorro')
    dispatch(addDato(form));
  }

  interface subtractSave {
    category: string,
    description: string,
    amount: number,
  }

  const [input3, setInput3] = useState<subtractSave>({
    category: 'input',
    description: '',
    amount: 0
  })

  function handleSubmit3(e: React.FormEvent<HTMLFormElement>) {         //-----Form 3, sacar ingreso
    e.preventDefault();
    console.log(form, 'form3 sacar ahorro')
    dispatch(addDato(form));
  }

  return (
    <div className={style.wrapperForm}>
      <form onSubmit={handleSubmit1}>
              <h2>Agrega una casilla de ahorro</h2>
              <label>Nombre de la casilla: </label>
              <input
                type='text'
                name='name'
                value={input1.name}
                placeholder='Agrega un nombre'
                onChange={handleChange}
              >
              </input>
              <label>Fecha de inicio: </label>
              <input
                type='date'
                name='start'
                value={input1.start}
                placeholder='Agrega una fecha'
                onChange={handleChange}
              >
              </input>
              <label>Fecha limite: </label>
              <input
                type='date'
                name='end'
                value={input1.end}
                placeholder='Agrega una descripcion'
                onChange={handleChange}
              >
              </input>
              <label>Deposito: </label>
              <input
                type='text'
                name='depositPlace'
                value={input1.depositPlace}
                placeholder='Donde esta alojado'
                onChange={handleChange}
              >
              </input>
              <label>Meta: $ </label>
              <input
                type='number'
                name='goal'
                min='0'
                value={input1.goal}
                placeholder='Agrega un monto'
                onChange={handleChange}
              >
              </input>
              <div>
              <label>Seleccionar tipo de moneda: </label>
                <input type="radio" name="currency" value="ARS" id="" onChange={handleChange} />Peso Argentino
                <input type="radio" name="currency" value="UYU" id="dolar" onChange={handleChange}/>Peso Uruguayo
                <input type="radio" name="currency" value="USD" id="dolar" onChange={handleChange}/>Dolar
                <input type="radio" name="currency" value="EUR" id="euro" onChange={handleChange}/>Euro
                <input type="radio" name="currency" value="LBP" id="libra" onChange={handleChange}/>Libra Esterlina
                <input type="radio" name="currency" value="JPY" id="yen" onChange={handleChange}/>Yen
                <input type="radio" name="currency" value="CHF" id="franco suizo" onChange={handleChange}/>Franco Suizo
              </div>
              <button type='submit' onClick={()=> setOpen(!open)}>Agregar</button>
      </form>
    </div>
  )
}