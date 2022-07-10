import React, { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { addDato } from 'redux/reducers/userReducer/actions/addDato';


export default function AddSaveForm(props : any) {
  const dispatch = useAppDispatch();
  const { open, setOpen, name } = props;

  interface Form {
    category: string,
    amount: number,
    date: string,
    description: string,
  }
  
  const [input, setInput] = useState<Form>({
    category: 'Ahorro',
    amount: 0,
    date: '',
    description: name,
  })

  interface AgregarAhorro {
    frequency: string,            
    key: string,
    value: Form,
  }

  const form: AgregarAhorro = {
    frequency:'extra',
    key: 'output',
    value: input,
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addDato(form));
    setInput({
      category: 'Ahorro',
      amount: 0,
      date: '',
      description: name,
    })
  }

  return (
    <div>
      <h2>Agrega una cantidad de ahorro</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha: </label>
        <input
          type='date'
          name='date'
          value={input.date}
          onChange={handleChange}
        >

        </input>
        <label>Monto: $</label>
        <input
          type='number'
          name='amount'
          value={input.amount}
          placeholder='Agrega una cantidad ahorro'
          onChange={handleChange}
        >
        </input>
        <button type='submit' onClick={()=> setOpen(!open)}>Agregar</button>
      </form>
    </div>
  )
}