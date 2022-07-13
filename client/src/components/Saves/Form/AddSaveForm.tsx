import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { addDato } from 'redux/reducers/userReducer/actions/addDato';
import style from '../Css/PopUpForm.module.css'


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
    frequency: 'extra',
    key: 'output',
    value: input,
  }

  //Validacion
  const firstRender = useRef(true)

  const [valMsg, setMsg] = useState('Completar los datos')
  const [valDisable, setDisabled] = useState(true)

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false
      return
    }
    
    !input.date ? setMsg('Proporcione una fecha') :
    !input.amount ? setMsg('Proporcione un monto') : 
    input.amount <= 0 ? setMsg('Colocar un numero valido') :
    setMsg('')
    
  }, [input])
  
  useEffect(() => {
    setDisabled(valMsg === '' ? false : true)
  }, [valMsg])

  //------------

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(valMsg === ''){
      dispatch(addDato(form));
    }
    setInput({
      category: 'Ahorro',
      amount: 0,
      date: '',
      description: name,
    })
  }

  return (
    <div className={style.wrapperForm}>
      <h2>Agrega una cantidad de ahorro</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha: </label>
        <input
          type='date'
          name='date'
          value={input.date}
          className={style.inputDate}
          onChange={handleChange}
        >

        </input>
        <label>Monto: $</label>
        <input
          type='number'
          name='amount'
          value={input.amount}
          placeholder='Agrega una cantidad ahorro'
          className={style.inputText}
          onChange={handleChange}
        >
        </input>

        <button type='submit' disabled={valDisable} onClick={valDisable === false ? ()=> setOpen(!open) : () => setOpen(open)}>Agregar</button>
      </form>
      <span id="validateError">{valMsg}</span>
    </div>
  )
}