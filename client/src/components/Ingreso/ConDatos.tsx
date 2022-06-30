import styles from "./ConDatos.module.css";
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import Pagination from './Pagination';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addDato, deleteDato, filterInputByCategory, getAllInputs, inputsFilterByFrequency, inputsFilterByMonth, inputsOrderByAmount, totalInput } from "redux/reducers/userReducer";


export default function ConDatos() {
  const { usuario, allInputs, totalInputsMonth, status, } = useAppSelector(state => state.user);
  const {monthlyInput, extraInput} = useAppSelector(state => state.user.usuario.Account)
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllInputs())
      dispatch(totalInput())
    }
  }, [status])

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
    id?: string,
    key: keyValue,             //extraInput, monthlyInput
    value: Value,
  }

  interface idUndefined {
    _id: string | undefined
  }

  interface accountParameter {
    id?: string,
    key: keyValue,
    value: idUndefined
  }

  const [input, setInput] = useState<Value>({
    category: '',
    description: '',
    amount: 0,
  })
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSelectC(e: React.ChangeEvent<HTMLSelectElement>) {
    setInput({
      ...input,
      category: e.target.value
    })
  }

  const form: AgregarIngresos = {
    key: 'extraInput',
    value: input,
  }

  const clearForm = () => {
    setInput({
      category: '',
      description: '',
      amount: 0,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addDato(form));
    clearForm();
  }
  //----------------------

  function handleDelete(event: accountParameter) {
    // event.preventDefault();
    dispatch(deleteDato(event))
  }
  
  function filterByMonth(e: any) {
    e.preventDefault();
    dispatch(inputsFilterByMonth(e.target.value))
  }

  function handleOrderAmount(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(inputsOrderByAmount(e.target.value))
  }

  function handleOrderByCategories(e: any) {
    e.preventDefault();
    dispatch(filterInputByCategory(e.target.value));
  }

  function handleOrderByFrequency(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(inputsFilterByFrequency(e.target))
  }

  return (
    <div>
      <Nav />
      <div className={styles.background}>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.title}>
            <h1>Tus Ingresos </h1>
          </div>

          <div className={styles.selectsOrder}>
            <select onChange={(e) => handleOrderAmount(e)}>
              <option>Ordenar por monto</option>
              <option value='mayorAMenor'>De mayor a menor</option>
              <option value='menorAMayor'>De menor a mayor</option>
            </select>
            <select onChange={(e) => handleOrderByCategories(e)}>
              <option>Ordenar por categoria</option>
              <option value='Salario'>Salario</option>
              <option value='Aguinaldo'>Aguinaldo</option>
              <option value='Herencia'>Herencia</option>
              <option value='Changa'>Changa</option>
              <option value='Regalo'>Regalo</option>
              <option value='Prestamo'>Préstamo</option>
              <option value='Otros'>Otros</option>
            </select>
            <select onChange={(e) => handleOrderByFrequency(e)}>
              <option>Ordenar por frecuencia</option>
              <option value='fijo'>Ingreso Fijo</option>
              <option value='extra'>Ingreso Extra</option>
            </select>
          </div>

          <div className={styles.allMonths}>
            <div className={styles.monthCard}>
              <button value='01' className={styles.month} id="Enero" onClick={(e) => filterByMonth(e)}>Enero</button>
              <button value='02' className={styles.month} id="Febrero" onClick={(e) => filterByMonth(e)}>Febrero</button>
              <button value='03' className={styles.month} id="Marzo" onClick={(e) => filterByMonth(e)}>Marzo</button>
              <button value='04' className={styles.month} id="Abril" onClick={(e) => filterByMonth(e)}>Abril</button>
              <button value='05' className={styles.month} id="Mayo" onClick={(e) => filterByMonth(e)}>Mayo</button>
              <button value='06' className={styles.month} id="Junio" onClick={(e) => filterByMonth(e)}>Junio</button>
              <button value='07' className={styles.month} id="Julio" onClick={(e) => filterByMonth(e)}>Julio</button>
              <button value='08' className={styles.month} id="Agosto" onClick={(e) => filterByMonth(e)}>Agosto</button>
              <button value='09' className={styles.month} id="Septiembre"onClick={(e) => filterByMonth(e)}>Septiembre</button>
              <button value='10' className={styles.month} id="Octubre" onClick={(e) => filterByMonth(e)}>Octubre</button>
              <button value='11' className={styles.month} id="Noviembre" onClick={(e) => filterByMonth(e)}>Noviembre</button>
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
            {allInputs.length > 0 ? allInputs.map((detalles: Value) => {
              console.log(detalles)
                return (
                  <tr>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button onClick={() => handleDelete({ id: usuario._id, key: 'extraInput', value: { _id: detalles._id } })}></button></th>
                  </tr>
                )
              }) 
              : <></>
              }
              <tr>
                <th className={styles.lastBox}></th>
                <th></th>
                <th></th>
                <th className={styles.totalAmount}><b>Total: ${totalInputsMonth}</b></th>
                <th className={styles.vacia}></th>
              </tr>
            </tbody>
          </table>

          <Pagination />

          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <select >
                <option>Selecciona el tipo</option>
                <option value='monthlyInput'>Ingreso fijo</option>
                <option value='extraInput'>Ingreso extra</option>
              </select>
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