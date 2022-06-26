import styles from "./ConDatos.module.css";
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import Pagination from './Pagination';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  addIngreso, setUser } from "redux/reducers/userReducer";

export default function ConDatos() {
  const { usuario } = useAppSelector( state => state.user);
  const dispatch = useAppDispatch();
  console.log(usuario, 'Que trae del reducer')

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const [monto, setMonto] = useState<number>(89086);  //const total = setMonto(usuario.Account.monthlyInput[0].amount + monto)
  
  //monto ---> la suma de todos los ingresos en el mes ()


  //----------Form-------------
  interface AgregarIngresos { 
    id: string,  
    key: string,
    value: Value,
  }
  interface Value {
    description: string,
    amount: number,
    category?: string
  }

  const [input, setInput] = useState<Value>({
      category: '',
      description: '',
      amount: 0,
  })

  function handleChange(e : any){ 
    console.log(e.target.value, "valor del input")
    setInput({
      ...input,
       [e.target.name] : e.target.value
      })
  }

  function handleSelect(e : any){    
    console.log(e.target.value, 'EL SELECT')   
    setInput({
      ...input,
      category : e.target.value
  })
  }

  const form : AgregarIngresos = {
    id: usuario._id,
    key: "extraInput",
    value: input
  }

  const clearForm = () =>{
    setInput({
      category: '',
      description: '',
      amount: 0,
    });
  }

  function handleSubmit(e : any){   
    e.preventDefault();
    console.log(form,'va el form')   //SOLO SE VA A ENVIAR SI se agrega el id del usuario, para eso hay que modificar el reducer
    dispatch(addIngreso(form));
    clearForm();
  } 
  //----------------------

  
  function handleOrderAmount( e : any){
    e.preventDefault();
    //dispatch(setUser(e.target.value));
  }

  function handleOrderDate(e : any){
    e.preventDefault();
    //dispatch(filterByDate(e.target.value));
  }

  //  useEffect(() => {
  //   dispatch(setUser())
  // }, [])

  return (
    <div>
      <Nav/>
      <div className={styles.background}>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.title}>
            <h1>Tus Ingresos </h1>
          </div>

          <div className={styles.selectsOrder}>
            <select onChange={(e) => handleOrderAmount(e)}>
              <option>Ordenar por monto</option>
              <option value='desc'>De mayor a menor</option>
              <option value='asc'>De menor a mayor</option>
            </select>
            <select onChange={(e) => handleOrderDate(e)}>
              <option>Ordenar por fecha</option>
              <option value='desc'>De mayor a menor</option>
              <option value='asc'>De menor a mayor</option>
            </select>
          </div>

          <div className={styles.allMonths}>
            <div className={styles.monthCard}>
              {meses.map(month => 
                (<button className={styles.month} id={month}>{month}</button>)
              )}
            </div>
            <div className={styles.annualCard}>
              <button className={styles.annual}>Todos</button>
            </div>
          </div>

          <table className={styles.table}>
            <thead className={styles.head}>
              <tr>
                <th>Fecha</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {usuario.Account.extraInput && usuario.Account.extraInput.map( detalles => {
                return(
                  <tr>
                  <th>{detalles.date.split("T")[0]}</th>
                  <th></th>
                  <th>{detalles.description}</th>
                  <th>$ {detalles.amount}</th>
                  <th><button></button></th>
                </tr>
                )
              })} */}

              <tr>
                <th className={styles.lastBox}></th>
                <th></th>
                <th></th>
                <th className={styles.totalAmount}><b>Total: ${monto}</b></th>
                <th className={styles.vacia}></th>
              </tr>
            </tbody>
          </table>

          <Pagination/>

          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <select onChange={handleSelect}>
                <option>Selecciona una categoria</option>
                <option value='Salario'>Salario</option>
                <option value='Aguinaldo'>Aguinaldo</option>
                <option value='Herencia'>Herencia</option>
                <option value='Changa'>Changa</option>
                <option value='Regalo'>Regalo</option>
                <option value='Prestamo'>Prestamo</option>
                <option value='Otros'>Otros</option>
              </select>
              <input 
                type='text' 
                name='description'
                // value={input.value.description} 
                placeholder='Agrega una descripcion'
                onChange={handleChange}
                >
              </input>
              <input 
                type='number' 
                name='amount'
                // value={input.value.amount} 
                placeholder='Agrega un monto'
                onChange={handleChange}
                >
                </input>
              <button type='submit'>Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}