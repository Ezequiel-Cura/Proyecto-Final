import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addCategory } from 'redux/modules/addCategory';

export default function CategoryCreate() {

  const dispatch = useAppDispatch();
  const { usuario, status } = useAppSelector(state => state.user);



  const [name, setName] = useState('');

  const [frequency, setFrequency] = useState('')
  
  const [type, setType] = useState('')

  const [valMsg, setMsg] = useState('')

  const [valAllow, setAllow] = useState(false)

  
  const handleFormChange = () => { 
    !form.name ? setMsg('Proporcione un nombre') : 
    !form.frequency ? setMsg('Proporcione una frequencia') : 
    !form.type ? setMsg('Proporcione un tipo') : 
    setMsg('')

    valMsg === '' && setAllow(true)
  }

  
  let validate = {
    msg: valMsg,
    allowed: valAllow
  }

  useEffect(() => {
    validate = {msg: valMsg, allowed: valAllow}
  }, [valMsg, valAllow])

  let form = {
    name: name,
    frequency: frequency,
    type: type
  }
  useEffect(() => {
    handleFormChange()
  }, [form])

  //NameControl
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setName(e.target.value)
  }
  useEffect(() => {
    form = {...form, name: name}
  }, [name])
  //-----------------------------------
  

  //FrequencyControl
  function handleFreqChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    setFrequency(e.target.value)
  }
  useEffect(() => {
    form = {...form, frequency: frequency}
  }, [frequency])
  //-----------------------------------
  
  //TypeControl
  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    setType(e.target.value)
  }
  useEffect(() => {
    form = {...form, type: type}
  }, [type])
  //-----------------------------------

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {         //Form
    e.preventDefault();
    console.log({ form })
    // dispatch(addCategory(form));
  }

  return (
    <div>
      <span>{validate.msg}</span>
      <form onSubmit={handleSubmit}>
        <label>Nombre de la categoría: </label>
        <input
          autoFocus={true}
          type='text'
          name='name'
          value={name}
          placeholder='Agrega un nombre'
          onChange={e => handleNameChange(e)}
        >
        </input>

        <select  value={frequency} onChange={(e) => handleFreqChange(e)} >
          <option value=''>Selecciona su frecuencia</option>
          <option value='monthly' >Ingreso fijo</option>
          <option value='extra'>Ingreso extra</option>
        </select>
        <select value={type} onChange={(e) => handleTypeChange(e)} >
          <option value=''>Selecciona su tipo</option>
          <option value='input'>Ingreso</option>
          <option value='output'>Gasto</option>
        </select>
        <button type='submit' disabled={!validate.allowed}>Agregar</button>
      </form>
    </div>
  )
}