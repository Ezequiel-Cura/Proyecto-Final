import styles from "../Ingreso/ConDatos.module.css";
import React, { useState } from 'react';
import Nav from "../Nav/Nav";
import Pagination from "components/Ingreso/Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  addDato } from "redux/reducers/userReducer";

export default function ConDatos() {
   const { usuario } = useAppSelector( state => state.user);
   const dispatch = useAppDispatch();

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const [monto, setMonto] = useState<number>(0);

  interface AgregarGastos { 
    id: string,  
    key: string,               //monthlyExpenses, variableExpenses
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
    setInput({
      ...input,
       [e.target.name] : e.target.value
      })
  }

  function handleSelectC(e : any){    
    setInput({
      ...input,
      category : e.target.value
  })
  }

  const form : AgregarGastos = {
    id: usuario._id,  
    key: 'variableExpenses',
    value: input,
  }

  function handleSubmit(e : any){   
    e.preventDefault();
    console.log(form)
    dispatch(addDato(form));
  } 
  
  return (
    <div>
      <Nav/>
      <div className={styles.background}>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.title}>
            <h1>Tus Gastos </h1>
          </div>

          <div className={styles.selectsOrder}>
            <select>
              <option>Ordenar por monto</option>
              <option value='desc'>De mayor a menor</option>
              <option value='asc'>De menor a mayor</option>
            </select>
            <select>
              <option>Ordenar por fecha</option>
              <option value='desc'>De mayor a menor</option>
              <option value='asc'>De menor a mayor</option>
            </select>
          </div>

          <div className={styles.allMonths}>
            <div className={styles.monthCard}>
              {meses.map(months => 
                (<button className={styles.months} id={months}>{months}</button>)
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
            {usuario.Account ? usuario.Account.monthlyExpenses.map( (detalles : any) => {
                return(
                  <tr>
                  <th>{detalles.date.split("T")[0]}</th>
                  <th>{detalles.category ? detalles.category : "-"}</th>
                  <th>{detalles.description}</th>
                  <th>$ {detalles.amount}</th>
                  <th><button></button></th>
                </tr>
                )
              }) : (
                <></>
              )}
            {/* Cuando se hace el post  te devuelve otro objeto (el account solo y no su totalidad, entonces se entra de otra manera) */}
              {usuario.monthlyExpenses ? usuario.monthlyExpenses.map( (detalles : any) => {
                return(
                  <tr>
                    <th>{detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button></button></th>
                  </tr>
                )
              }) : (
                <></>
              )}

              {usuario.Account ? usuario.Account.variableExpenses.map((detalles : any) => {
                return (
                  <tr className={styles.monthlyInput}>
                    <th>{detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button></button></th>
                  </tr>
                )
              }) : (
                <></>
              )}

              {usuario.variableExpenses ? usuario.variableExpenses.map( (detalles : any) => {
                return(
                  <tr className={styles.monthlyInput}>
                    <th>{detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button></button></th>
                  </tr>
                )
              }) : (
                <></>
              )}

              <tr>
                <th>Ejemplo</th>
                <th>Ej</th>
                <th>Ej</th>
                <th>Ej</th>
                <th><button></button></th>
              </tr>
              <tr>
                <th>Ejemplo</th>
                <th>Ej</th>
                <th>Ej</th>
                <th>Ej</th>
                <th><button></button></th>
              </tr>
              <tr>
                <th>Ejemplo</th>
                <th>Ej</th>
                <th>Ej</th>
                <th>Ej</th>
                <th><button></button></th>
              </tr>
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
              <select onChange={handleSelectC}>
                <option>Selecciona una categoria</option>
                <option value='Alimentos'>Alimentos</option>
                <option value='Gimnasio'>Gimnasio</option>
                <option value='Salud'>Salud</option>
                <option value='Viaje'>Viaje</option>
                <option value='Ocio'>Ocio</option>
                <option value='Alquiler'>Alquiler</option>
                <option value='Combustible'>Combustible</option>
                <option value='Otros'>Otros</option>
              </select>
              <input 
                type='text' 
                name='description'
                placeholder='Agrega una descripcion'
                onChange={handleChange}
                >
              </input>
              <input 
                type='number' 
                name='amount'
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