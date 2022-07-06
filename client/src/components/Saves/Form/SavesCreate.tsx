import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving } from 'redux/modules/addSaving';
import style from '../PopUpForm.module.css'

export default function SavesCreate() {
  const dispatch = useAppDispatch();
  const { usuario, status } = useAppSelector(state => state.user);

  interface Currency {
    type: string,
  }
  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    depositPlace: string,
    //currency: Currency,
  }

  const [input, setInput] = useState<SavingUser>({
    name: '', 
    start: '', 
    end: '', 
    goal: 0,
    depositPlace: ''
    //currency: {type: ''}
  });

  const form = {
    value: input
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {         //-----Form
    e.preventDefault();
    console.log(form, 'form')
    dispatch(addSaving(form));
    {status === 'success' 
      ? <p>Se agrego! Vuelve a Ahorros</p>
      : <p>Hubo algun problema, intentalo mas tarde</p>
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
              <label>Nombre de la casilla: </label>
              <input
                type='text'
                name='name'
                value={input.name}
                placeholder='Agrega un nombre'
                onChange={handleChange}
              >
              </input>
              <label>Fecha de inicio: </label>
              <input
                type='date'
                name='start'
                value={input.start}
                placeholder='Agrega una fecha'
                onChange={handleChange}
              >
              </input>
              <label>Fecha limite: </label>
              <input
                type='date'
                name='end'
                value={input.end}
                placeholder='Agrega una descripcion'
                onChange={handleChange}
              >
              </input>
              <label>Primer ahorro: </label>
              <input
                type='text'
                name='depositPlace'
                value={input.depositPlace}
                placeholder='Agrega el primer monto de ahorro'
                onChange={handleChange}
              >
              </input>
              <label>Meta: $ </label>
              <input
                type='number'
                name='goal'
                min='0'
                value={input.goal}
                placeholder='Agrega un monto'
                onChange={handleChange}
              >
              </input>
              <p>
                <label>Seleccionar tipo de moneda: </label>
                <br/>
                <label>
                  <input type="radio" name="currency" value="argentina"/>Peso Argentino
                </label>
                <br/>
                <label>
                  <input type="radio" name="currency" value="dolar"/>Dolar
                </label> 
              </p>
              <Button type='submit'>Agregar</Button>
      </form>
    </div>
  )
}