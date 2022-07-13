import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving } from 'redux/reducers/userReducer/actions/addSaving';
import style from '../Css/PopUpForm.module.css'

export default function SavesCreate(props : any) {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector(state => state.user);
  const { open, setOpen } = props;

  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    depositPlace: string,
    currency: string,
  }

  const [input, setInput] = useState<SavingUser>({
    name: '', 
    start: '', 
    end: '', 
    goal: 0,
    depositPlace: '',
    currency: ''
  });

  const form = {
    value: input
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

      const namesSavings = usuario.savings.map((e : any) => e.name)
      
      !input.name ? setMsg('Agregue un nombre') :
      namesSavings.indexOf(input.name) !== -1 ? setMsg('Ya existe una casilla con este nombre, agregue otro'):                                           //-------------------------------!!
      !input.start ? setMsg('Agrega una fecha de inicio') : 
      !input.end ? setMsg('Agrega una fecha limite') :
      !input.goal ? setMsg('Agregar un monto de meta') :
      input.goal <= 0 ? setMsg('Colocar un numero valido') :
      !input.depositPlace ? setMsg('Colocar lugar donde se guarda') :
      !input.currency ? setMsg('Selecciona el tipo de moneda') :
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
  function handleSubmit1(e: React.FormEvent<HTMLFormElement>) {         //-----Form 1 
    e.preventDefault();
    if(valMsg === ''){
      dispatch(addSaving(form));
    }
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
                value={input.name}
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
                value={input.start}
                placeholder='Agrega una fecha'
                className={style.inputDate}
                onChange={handleChange}
              >
              </input>
              <label>Fecha limite: </label>
              <input
                type='date'
                name='end'
                value={input.end}
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
                value={input.depositPlace}
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
                value={input.goal}
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
              <button type='submit' disabled={valDisable} onClick={valDisable === false ? ()=> setOpen(!open) : () => setOpen(open)}>Agregar</button>
      </form>
      <span id="validateError">{valMsg}</span>
    </div>
  )
}