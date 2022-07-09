import React, { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { addDato } from 'redux/reducers/userReducer/actions/addDato';


export default function AddSaveForm(props : any) {
  const dispatch = useAppDispatch();
  const { open, setOpen } = props;

  interface Form {
    category: string,
    amount: number,
    date: string,
    description: string,
  }
  
  const [input, setInput] = useState<Form>({
    category: 'extra',
    amount: 0,
    date: '',
    description: 'Nuevo Ahorro',
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
    console.log(form, "form en Expenses")
    dispatch(addDato(form));
    setInput({
      category: 'extra',
      amount: 0,
      date: '',
      description: 'Nuevo Ahorro',
    })
  }

  return (
    <div>
      <h2>Agrega una cantidad de ahorro</h2>
      <form onSubmit={handleSubmit}>
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