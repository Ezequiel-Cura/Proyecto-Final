import styles from "../Ingreso/ConDatos.module.css";
import stylesPag from "../Ingreso/Pagination.module.css"
import React, { useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { filterExpensesByCategory, getAllExpenses, expensesFilterByFrequency, /*expensesFilterByMonth,*/ expensesOrderByAmount, totalExpenses } from "redux/reducers/userReducer";
import {addDato} from 'redux/modules/addDato'
import {deleteDato} from 'redux/modules/deleteDato'


export default function ConDatos() {
   const { usuario, allOutputs, totalExpensesMonth, status } = useAppSelector( state => state.user);
   const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllExpenses())
      dispatch(totalExpenses())
    }
  }, [status])

  interface AgregarGastos { 
    id?: string,  
    key: string,               //monthlyExpenses, variableExpenses
    value: Value,
  }
  interface Value {
    description: string,
    amount: number,
    category?: string,
    date?: string,
    _id?: string,
    source?: string 
  }

  const [input, setInput] = useState<Value>({
      category: '',
      description: '',
      amount: 0,
  })

  interface keySelect {
    keyInput: string
  }

  const [selectKey, setSelectKey] = useState<keySelect>({
    keyInput: '', 
  })

  function handleChange(e : React.ChangeEvent<HTMLInputElement>){ 
    setInput({
      ...input,
       [e.target.name] : e.target.value
      })
  }

  function handleSelectI(e : React.ChangeEvent<HTMLSelectElement>){    
    setSelectKey({
      ...selectKey,
      keyInput: e.target.value
    })
  }

  function handleSelectC(e: React.ChangeEvent<HTMLSelectElement>) {
    setInput({
      ...input,
      category: e.target.value
    })
  }

  const form : AgregarGastos = {
    key: selectKey.keyInput,
    value: input,
  }

  function handleSubmit(e : React.FormEvent<HTMLFormElement>){   
    e.preventDefault();
    dispatch(addDato(form));
  } 

  function handleDelete(event: any) {
    dispatch(deleteDato(event))
  }
  
  // function filterByMonth(e: any) {
  //   e.preventDefault();
  //   dispatch(expensesFilterByMonth(e.target.value))
  // }

  function handleOrderAmount(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(expensesOrderByAmount(e.target.value))
  }

  function handleOrderByCategories(e: any) {
    e.preventDefault();
    dispatch(filterExpensesByCategory(e.target.value));
  }

  function handleOrderByFrequency(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(expensesFilterByFrequency(e.target.value))
  }

  function handleRefresh(e: any){
    e.preventDefault();
    dispatch(getAllExpenses())
  }

  //Paginado---------------------------------------------------------------
  const [page, setPage] = useState(1);
  const [inputsPerPage, ] = useState(6);

  const [pageLimit, ] = useState(10);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allOutputs.length/inputsPerPage); i++){
      pageNumber.push(i)
  }

  const indice = pageNumber && pageNumber.map(pag => {
    if(pag <= maxPageLimit  && pag > minPageLimit){  
      return <button className={pag === page ? stylesPag.active : styles.normal} onClick={() => setPage(pag)}>{pag}</button>
    } else return null; 
  })

  const handlePrevButton = () => {
    setPage((prev) => prev === 1 ? prev : prev - 1); 
      if(page !== 1 && (page - 1) % pageLimit === 0){
        setMaxPageLimit(maxPageLimit - pageLimit);
        setMinPageLimit(minPageLimit - pageLimit);
    }
  }

  const handleNextButton = () => {
    setPage((next) => next === pageNumber.length ? next : next + 1 );   
      if(page + 1 > maxPageLimit){
        setMaxPageLimit(maxPageLimit + pageLimit);
        setMinPageLimit(minPageLimit + pageLimit);
    }
  }
  
  return (
      <div className={styles.background}>
      <Nav/>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.title}>
            <h1>Tus Gastos </h1>
          </div>

          <div className={styles.selectsOrder}>
            <select value='Ordenar' onChange={(e) => handleOrderAmount(e)}>
              <option>Ordenar por monto</option>
              <option value='mayorAMenor'>De mayor a menor</option>
              <option value='menorAMayor'>De menor a mayor</option>
            </select>
            <select value='Ordenar' onChange={(e) => handleOrderByCategories(e)}>
              <option>Ordenar por categoria</option>
              {
                usuario.CategoriesExpenses.length > 0
                  ? usuario.CategoriesExpenses.map((category: string) => (<option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>))
                  : <option value="Otros"></option>
              }
            </select>
            <select value='Ordenar' onChange={(e) => handleOrderByFrequency(e)}>
              <option>Ordenar por frecuencia</option>
              <option value='fijo'>Gasto Fijo</option>
              <option value='variable'>Gasto Variable</option>
            </select>
          </div>

          <div className={styles.allMonths}>
            <div className={styles.monthCard}>
            <button value='01' className={styles.months} id="Enero" /* onClick={(e) => filterByMonth(e)}*/>Enero</button>
              <button value='02' className={styles.months} id="Febrero" /* onClick={(e) => filterByMonth(e)}*/>Febrero</button>
              <button value='03' className={styles.months} id="Marzo" /* onClick={(e) => filterByMonth(e)}*/>Marzo</button>
              <button value='04' className={styles.months} id="Abril" /* onClick={(e) => filterByMonth(e)}*/>Abril</button>
              <button value='05' className={styles.months} id="Mayo" /* onClick={(e) => filterByMonth(e)}*/>Mayo</button>
              <button value='06' className={styles.months} id="Junio" /* onClick={(e) => filterByMonth(e)}*/>Junio</button>
              <button value='07' className={styles.months} id="Julio" /* onClick={(e) => filterByMonth(e)}*/>Julio</button>
              <button value='08' className={styles.months} id="Agosto" /* onClick={(e) => filterByMonth(e)}*/>Agosto</button>
              <button value='09' className={styles.months} id="Septiembre"/* onClick={(e) => filterByMonth(e)}*/>Septiembre</button>
              <button value='10' className={styles.months} id="Octubre" /* onClick={(e) => filterByMonth(e)}*/>Octubre</button>
              <button value='11' className={styles.months} id="Noviembre" /* onClick={(e) => filterByMonth(e)}*/>Noviembre</button>
              <button value='12' className={styles.months} id="Diciembre" /* onClick={(e) => filterByMonth(e)}*/>Diciembre</button>
            </div>
            <div className={styles.annualCard}>
              <button className={styles.annual} onClick={handleRefresh}>Refresh</button>
            </div>
          </div>

          <table className={styles.table}>
            <thead className={styles.head}>
              <tr>
                <th></th>
                <th>Fecha</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
            {allOutputs.length > 0 ?allOutputs.slice((page - 1) * inputsPerPage, (page - 1 ) * inputsPerPage + inputsPerPage).map((detalles: any) => {
                return (
                  detalles.source === 'monthlyExpenses' 
                  ? (<tr className={styles.monthlyInput}>
                    <th><button onClick={() => handleDelete({ id: usuario._id, key: detalles.source, value: { _id: detalles._id } })}></button></th>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                  </tr>)
                  : (
                    <tr>
                    <th><button onClick={() => handleDelete({ id: usuario._id, key: detalles.source, value: { _id: detalles._id } })}></button></th>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                  </tr>
                  )
                )
              }) 
              : <></>
              }
              <tr>
                <th className={styles.lastBox}></th>
                <th></th>
                <th></th>
                <th></th>
                <th className={styles.totalAmount}><b>Total: ${totalExpensesMonth}</b></th>
              </tr>
            </tbody>
          </table>

          <div className={stylesPag.wrapperPag}>
            <button className={page <= 1 ? stylesPag.disabledPrev : stylesPag.paginationPrev } onClick={() => handlePrevButton()}>Prev</button>
            {indice}
            <button className={page >= pageNumber.length ? stylesPag.disabledNext : stylesPag.paginationNext } onClick={() => handleNextButton()}>Next</button>
          </div>

          <form onSubmit={handleSubmit}> 
            <div className={styles.form}>
              <select onChange={handleSelectI}>
                <option>Selecciona el tipo</option>
                <option value='monthlyExpenses'>Gasto fijo</option>
                <option value='variableExpenses'>Gasto Variable</option>
              </select>

              <select value={input.category} onChange={handleSelectC}>
                <option>Selecciona una categoría</option>
                {usuario.CategoriesExpenses.length > 0
                  ? usuario.CategoriesExpenses.map((category: string) =>
                    (<option value={category}>{category}</option>))
                  : (<option value="Otros">Otros</option>)
                  }
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
              <input
                type='date'
                name='date'
                placeholder='Agrega una fecha'
                onChange={handleChange}
                >
              </input>
              <button type='submit'>Agregar</button>
            </div>
          </form>
        </div>
      </div>
  )
}