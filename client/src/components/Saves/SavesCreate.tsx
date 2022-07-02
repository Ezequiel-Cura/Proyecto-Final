import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving, deleteSaving } from 'redux/reducers/userReducer';

export default function SavesCreate() {

  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector(state => state.user);

  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    place: string,
    currency: string,
    amount: number
  }

  const [input, setInput] = useState<SavingUser>({
    name: '',
    start: '',
    end: '',
    goal: 0,
    place: '',
    currency: '',
    amount: 0
  });

  const form = {
    id: usuario._id,
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
    dispatch(addSaving());
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
                type='text'
                name='name'
                value={input.name}
                placeholder='Agrega un nombre'
                onChange={handleChange}
              >
              </input>
              <input
                type='date'
                name='end'
                value={input.end}
                placeholder='Agrega una fecha'
                onChange={handleChange}
              >
              </input>
              <label>$</label>
              <input
                type='number'
                name='goal'
                min='0'
                value={input.goal}
                placeholder='Monto'
                onChange={handleChange}
              >
              </input>
              <button type='submit'>Agregar</button>
      </form>
    </div>
  )
}