import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addCategory } from 'redux/modules/addCategory';

export default function CategoryCreate() {

  const dispatch = useAppDispatch();
  const { usuario, status } = useAppSelector(state => state.user);

  interface input{
    name: string
  }

  interface select {
    frequency: string,
    type: string,
  }

  const [inputName, setInput] = useState<input>({
    name: ''
  });

  const [selectOpt, setSelectOpt] = useState<select>({
    frequency: '',
    type: '',
  })

  const form = {
    id: usuario._id,
    value:{
        name: inputName.name,
        frequency: selectOpt.frequency,
        type: selectOpt.type
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ 
        name: e.target.value
    })
  }
  function handleSelectInputs(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectOpt({
      ...selectOpt,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {         //-----Form
    e.preventDefault();
    dispatch(addCategory(form));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
              <label>Nombre de la categoría: </label>
              <input
                type='text'
                name='name'
                value={inputName.name}
                placeholder='Agrega un nombre'
                onChange={handleChange}
              >
              </input>
              <select value={selectOpt.frequency} onChange={handleSelectInputs}>
                  <option>Selecciona su frecuencia</option>
                  <option value='monthly'>Ingreso fijo</option>
                  <option value='extra'>Ingreso extra</option>
                </select>
                <select value={selectOpt.type} onChange={handleSelectInputs}>
                  <option>Selecciona su tipo</option>
                  <option value='input'>Ingreso</option>
                  <option value='output'>Gasto</option>
                </select>
              <button type='submit'>Agregar</button>
      </form>
      {status === 'success' 
      ? <p>Se agrego! Ya puedes seleccionarla entre tus opciones.</p>
      : <p>Hubo un problema, inténtalo más tarde.</p>
      }
    </div>
  )
}