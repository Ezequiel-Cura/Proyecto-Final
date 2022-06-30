import styles from "./ConDatos.module.css";
import stylesPag from "./Pagination.module.css"
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addDato, deleteDato, getAllInputs, inputsFilterByMonth, inputsOrderByAmount, inputsFilterByFrequency, filterInputByCategory, totalInput } from "redux/reducers/userReducer";

export default function ConDatos() {
  const { usuario, allInputs, totalInputsMonth, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(getAllInputs())
      dispatch(totalInput())
    }
  }, [status])
  interface Value {
    description: string,
    amount: number,
    category?: string,
    date?: string,
    _id?: string,
    source?: string 
  }
  interface AgregarIngresos {
    id?: string,
    key: string,             
    value: Value,
  }

  //Delete:-----------------
  interface idUndefined {
    _id: string | undefined
  }

  interface accountParameter {
    id?: string,
    key: string | undefined,
    value: idUndefined
  }
   //-----------------------

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
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSelectI(e: React.ChangeEvent<HTMLSelectElement>) {
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

  const form: AgregarIngresos = {
    key: selectKey.keyInput,
    value: input,
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {         //-----Form
    e.preventDefault();
    dispatch(addDato(form));
    setInput({
      category: '',
      description: '',
      amount: 0,
    })
  }

  function handleDelete(event: accountParameter) {
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
    dispatch(inputsFilterByFrequency(e.target.value))
  }

  function handleRefresh(e: any){
    e.preventDefault();
    dispatch(getAllInputs())
  }

  //Paginado---------------------------------------------------------------
  const [page, setPage] = useState(1);
  const [inputsPerPage, setinputsPerPage] = useState(6);

  const [pageLimit, setPageLimit] = useState(10);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allInputs.length/inputsPerPage); i++){
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
    <div>
      <Nav />
      <div className={styles.background}>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.title}>
            <h1>Tus Ingresos </h1>
          </div>
{/* <Button variant="contained" color="secondary" onClick={handleRefresh()}>
  REFRESH
</Button> */}
          <div className={styles.selectsOrder}>
            <select value='Ordenar' onChange={(e) => handleOrderAmount(e)}>
              <option>Ordenar por monto</option>
              <option value='mayorAMenor'>De mayor a menor</option>
              <option value='menorAMayor'>De menor a mayor</option>
            </select>
            <select value='Ordenar' onChange={(e) => handleOrderByCategories(e)}>
              <option>Ordenar por categoria</option>
              {
                usuario.CategoriesInputs.length > 0 
                ? usuario.CategoriesInputs.map( (category: string) => ( <option value={category}>{category}</option>))
                : <option value="Otros"></option>
              }
            </select>
            <select value='Ordenar' onChange={(e) => handleOrderByFrequency(e)}>
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
            {allInputs.length > 0 ? allInputs.slice((page - 1) * inputsPerPage, (page - 1 ) * inputsPerPage + inputsPerPage).map((detalles: Value) => {
                return (
                  detalles.source === 'monthlyInput' 
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
                <th className={styles.totalAmount}><b>Total: ${totalInputsMonth}</b></th>
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
                <option value='monthlyInput'>Ingreso fijo</option>
                <option value='extraInput'>Ingreso extra</option>
              </select>

              {
                selectKey.keyInput === 'monthlyInput' 
                ? (<select onChange={handleSelectC}>
                    <option>Selecciona una categoría</option>
                    <option value='Salario'>Salario</option>
                    <option value='Herencia'>Herencia</option>
                    <option value='Prestamo'>Préstamo</option>
                    <option value='Otros'>Otros</option>
                  </select>)
                : (<select onChange={handleSelectC}>
                    <option>Selecciona una categoría</option>
                    <option value='Aguinaldo'>Aguinaldo</option>
                    <option value='Herencia'>Herencia</option>
                    <option value='Changa'>Changa</option>
                    <option value='Regalo'>Regalo</option>
                    <option value='Prestamo'>Préstamo</option>
                    <option value='Otros'>Otros</option>
                  </select>)
              }

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
    </div>
  )
}
