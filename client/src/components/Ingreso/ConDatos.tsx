import styles from "./ConDatos.module.css";
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import Pagination from './Pagination';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  addDato, deleteDato, inputsFilterByMonth } from "redux/reducers/userReducer";

export default function ConDatos() {
  
  const { usuario } = useAppSelector( state => state.user);

  const dispatch = useAppDispatch();

   const [monto, setMonto] = useState<number>(0);  

  //----------Form-------------

  type keyValue = "extraInput" | "monthlyInput"
  
  interface Value {
    description: string,
    amount: number,
    category?: string,
    date?: string,
    _id?: string
  }
  interface AgregarIngresos { 
    id: string,  
    key: keyValue,             //extraInput, monthlyInput
    value: Value,
  }

  interface idUndefined{
      _id: string | undefined
  }

  interface accountParameter{
    id: string,
    key: keyValue,
    value: idUndefined
  }

  const [input, setInput] = useState<Value>({
      category: '',
      description: '',
      amount: 0,
  })

  // const [form, setForm] = useState<AgregarIngresos>({ ------------------Ver como o unir dos estados (uno dentro del otro) o que 
  //   id: "62b77fc6cf92600dadcd1918",
  //   key: "",
  //   input : {
  //     category
  //   }
  // })

  function handleChange(e : React.ChangeEvent<HTMLInputElement>){ 
    setInput({
      ...input,
       [e.target.name] : e.target.value
      })
  }

  function handleSelectC(e : React.ChangeEvent<HTMLSelectElement>){    
    setInput({
      ...input,
      category : e.target.value
  })
  }

  const form : AgregarIngresos = {
    id: usuario._id,  
    key: 'extraInput',
    value: input,
  }

  const clearForm = () =>{
    setInput({
      category: '',
      description: '',
      amount: 0,
    });
  }

  function filterByMonth(e: any){
    e.preventDefault();
    dispatch(inputsFilterByMonth(e.target.value))
  }

  function handleSubmit(e : React.FormEvent<HTMLFormElement>){   
    e.preventDefault();
    dispatch(addDato(form));
    clearForm();
  } 
  //----------------------
  
  function handleOrderAmount( e : React.ChangeEvent<HTMLSelectElement>){
  // {   "id": "62b7b9f2168812a442797012",
  //   "key": "extraInput",
  //   "value": {"_id": "62b8b79f91091d937fe969d7"}
  // }
  }

  function handleDelete(event: accountParameter){
    // event.preventDefault();
    console.log({event})
    dispatch(deleteDato(event))
  }

  function handleOrderDate(e : React.ChangeEvent<HTMLSelectElement>){
    e.preventDefault();
    //dispatch(filterByDate(e.target.value));
  }

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
            <button value='01' className={styles.month} id="Enero" onClick={(e) => filterByMonth(e)}>Enero</button>
            <button value='02' className={styles.month} id="Febrero">Febrero</button>
            <button value='03' className={styles.month} id="Marzo">Marzo</button>
            <button value='04' className={styles.month} id="Abril">Abril</button>
            <button value='05' className={styles.month} id="Mayo">Mayo</button>
            <button value='06' className={styles.month} id="Junio">Junio</button>
            <button value='07' className={styles.month} id="Julio">Julio</button>
            <button value='08' className={styles.month} id="Agosto">Agosto</button>
            <button value='09' className={styles.month} id="Septiembre">Septiembre</button>
            <button value='10' className={styles.month} id="Octubre">Octubre</button>
            <button value='11' className={styles.month} id="Noviembre">Noviembre</button>
            <button value='12' className={styles.month} id="Diciembre" onClick={(e) => filterByMonth(e)}>Diciembre</button>
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
              { usuario.Account.extraInput.map( (detalles : Value) => {
                return(
                  <tr>
                  <th>{detalles.date && detalles.date.split("T")[0]}</th>
                  <th>{detalles.category ? detalles.category : "-"}</th>
                  <th>{detalles.description}</th>
                  <th>$ {detalles.amount}</th>
                  <th><button onClick={ () => handleDelete({id: usuario._id, key: 'extraInput', value: {_id: detalles._id}})}></button></th>
                </tr>
                )
              }) 
              }
              {usuario.Account ? usuario.Account.monthlyInput.map((detalles : any) => {
                return (
                  <tr className={styles.monthlyInput}>
                    <th>{detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button onClick={ () => handleDelete({id: usuario._id, key: 'extraInput', value: {_id: detalles._id}})}></button></th>
                  </tr>
                )
              }) : (
                <></>
              )}

              {usuario.monthlyInput ? usuario.monthlyInput.map( (detalles : any) => {
                return(
                  <tr className={styles.monthlyInput}>
                    <th>{detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button onClick={ e => handleDelete({id: usuario._id, key: 'extraInput', value: {_id: detalles._id}})}></button></th>
                  </tr>
                )
              }) : (
                <></>
              )}

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
              {/* <select >
                <option>Selecciona el tipo</option>
                <option value='monthlyInput'>Ingreso fijo</option>
                <option value='extraInput'>Ingreso extra</option>
              </select> */}
              <select onChange={handleSelectC}>
                <option>Selecciona una categoría</option>
                <option value='Salario'>Salario</option>
                <option value='Aguinaldo'>Aguinaldo</option>
                <option value='Herencia'>Herencia</option>
                <option value='Changa'>Changa</option>
                <option value='Regalo'>Regalo</option>
                <option value='Prestamo'>Préstamo</option>
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