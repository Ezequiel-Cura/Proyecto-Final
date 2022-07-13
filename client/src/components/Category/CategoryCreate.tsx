import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addCategory } from 'redux/reducers/userReducer/actions/addCategory';

export default function CategoryCreate(props : any) {
  const dispatch = useAppDispatch();
  const { usuario, status } = useAppSelector(state => state.user);
  const {open, setOpen} = props
  const [name, setName] = useState('');

  const [frequency, setFrequency] = useState('')
  
  const [type, setType] = useState('')


    // Validate
    const firstRender = useRef(true)

    const [valMsg, setMsg] = useState('')
    const [valDisable, setDisabled] = useState(true)


    useEffect(() => {
      handleFormChange()
    }, [name, frequency, type])

    useEffect(() => {
      setDisabled(valMsg === '' ? false : true)
    }, [valMsg])
    //-----------------------------------


  let form = {
    name: name,
    frequency: frequency,
    type: type
  }

  const handleFormChange = () => {
      !form.name ? setMsg('Proporcione un nombre') : 
      !form.frequency ? setMsg('Proporcione una frequencia') : 
      !form.type ? setMsg('Proporcione un tipo') : 
      setMsg('')
  }


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

  const defVals = ['Changa', 'Herencia', 'Encontrado', 'Préstamo', 'Salario', 'Alquiler', 'Deuda', 'Impuestos', 'Salud', 'Viaje', 'Regalo', 'Super', 'Transporte', 'Restaurante', 'Vestimenta', 'Shopping', '', 'Crear']
  const categoryType = usuario.categories.map((e:any)=> e.type)
  const categoryName = usuario.categories.map((e:any)=> e.name)

  let creationSwitch = false
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {         //Form
    e.preventDefault();

    if (categoryName.includes(form.name) && categoryType.includes(form.type)){
      setMsg('Esta categoria ya existe')
    } else if (defVals.includes(form.name)) {
      setMsg('Esta categoria ya existe en las categorias basicas')
    } else {
      dispatch(addCategory({value: form}))
    }

  }

  if(status === 'CategoryCreated')window.location.reload()

  return (
    <div>
      <span>{valMsg}</span>
      <form onSubmit={(e) => handleSubmit(e)}>
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

        <select value={type} onChange={(e) => handleTypeChange(e)} >
          <option value='' disabled={true}>Selecciona su tipo</option>
          <option value='input'>Ingreso</option>
          <option value='output'>Gasto</option>
        </select>

        <select  value={frequency} onChange={(e) => handleFreqChange(e)} >
          <option value='' disabled={true}>Selecciona su frecuencia</option>
          <option value='monthly' >Fijo</option>
          <option value='extra'>Extra</option>
        </select>
        <button type='submit' disabled={valDisable}>Agregar</button>
      </form>
    </div>
  )
}
