import styles from "../Ingreso/Tables.module.css";
import stylesPag from "../Ingreso/Pagination.module.css"
import React, { useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { expensesFilterByFrequency, /*expensesFilterByMonth,*/ expensesOrderByAmount, totalExpenses } from "redux/reducers/userReducer";
import {addDato} from 'redux/modules/addDato'
import {deleteDato} from 'redux/modules/deleteDato'


export default function ExpensesTable() {
   const { usuario, renderOutputs, totalExpensesMonth, status } = useAppSelector( state => state.user);
   const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      // dispatch(getAllExpenses())
      dispatch(totalExpenses())
    }
  }, [status])

  interface AgregarGastos { 
    id?: string,  
    key: string,               //monthlyExpenses, variableExpenses
    value: Value,
  }
  interface Value {
    date: string,
    end?: string,
    description: string,
    category: string,
    amount: number
  }

  interface Category {
    name: string,
    frequency: string,
    type: string,
    _id: {
      $oid: string
    }
  }

  const [input, setInput] = useState<Value>({
    category: '',
    description: '',
    amount: 0,
    date: '',
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
    console.log(e.target.value)
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
    // dispatch(filterExpensesByCategory(e.target.value));
  }

  function handleOrderByFrequency(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(expensesFilterByFrequency(e.target.value))
  }

  function handleRefresh(e: any){
    e.preventDefault();
    // dispatch(getAllExpenses())
  }

  //Paginado---------------------------------------------------------------
  const [page, setPage] = useState(1);
  const [inputsPerPage, ] = useState(6);

  const [pageLimit, ] = useState(10);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const pageNumber = [];
    for(let i = 1; i <= Math.ceil(renderOutputs.length/inputsPerPage); i++){
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
                ['Impuestos', 'Deuda', 'Transporte', 'Super', 'Regalo', 'Alquiler', 'Otros'].map(undefinedCategory => {
                  return (<option value={undefinedCategory}>{undefinedCategory}</option>)
                })
              }
              {
                usuario.categories.filter((category: Category) => category.type === 'output').map((category: Category) => {
                  return (<option value={category.name}>{category.name}</option>)
              })
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
            {
                ['Enero', 'Febero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(
                  (month, i) => {
                    return( <button value={i < 10 ? `0${i}` : i} className={styles.month} id={month} /*onClick={(e) => filterByMonth(e)}*/>{month}</button>
                  )}
                )
              }
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
            {renderOutputs.length > 0 ? renderOutputs.slice((page - 1) * inputsPerPage, (page - 1 ) * inputsPerPage + inputsPerPage).map((detalles: any) => {
                return (
                  <tr className={styles.monthlyInput}>
                    <th><button onClick={() => handleDelete({ id: usuario._id, key: detalles.source, value: { _id: detalles._id } })}></button></th>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                  </tr>
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
                  {
                    selectKey.keyInput ?
                      selectKey.keyInput === 'monthlyExpenses'
                        ? ['Transporte', 'Alquiler', 'Deuda','Impuestos', 'Otros'].map(montOutput => {
                          return (<option value={montOutput}>{montOutput}</option>)
                        })
                        : ['Regalo', 'Super', 'Transporte', 'Otros'].map(extraOutput => {
                          return (<option value={extraOutput}>{extraOutput}</option>)
                        })
                      : ['Impuestos', 'Transporte', 'Alquiler', 'Deuda', 'Otros'].map(undefinedCategory => {
                        return (<option value={undefinedCategory}>{undefinedCategory}</option>)
                      })
                  }
                  {selectKey.keyInput === 'monthlyExpenses'
                    ? usuario.categories.filter((montOutput: Category) => montOutput.frequency === 'monthly' && montOutput.type === 'output').map((montOutput: Category) => {
                      return (<option value={montOutput.name}>{montOutput.name}</option>)
                    })
                    : usuario.categories.filter((extraOutput: Category) => extraOutput.frequency === 'extra' && extraOutput.type === 'output').map((extraOutput: Category) => {
                      return (<option value={extraOutput.name}>{extraOutput.name}</option>)
                    })
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