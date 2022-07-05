import React, { useEffect, useState } from 'react';
import styles from "./Tables.module.css";
import stylesPag from "./Pagination.module.css"
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { /*inputsFilterByMonth,*/ /*inputsOrderByAmount,*/ inputsFilterByFrequency, /*filterInputByCategory,*/ totalInput, renderInput } from "redux/reducers/userReducer";
import { addDato } from 'redux/modules/addDato'
import { deleteDato } from 'redux/modules/deleteDato'
// import { addCategory } from 'redux/modules/addCategory'
import { deleteCategory } from 'redux/modules/deleteCategory'
import PopUp from 'components/Saves/PopUp';
import CategoryCreate from 'components/Category/CategoryCreate';

export default function InputTable() {

  const { usuario, totalInputsMonth, status, renderInputs } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [date, setDate] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`)

  useEffect(() => {
    if (status === 'success') {
      dispatch(renderInput(date))
      dispatch(totalInput())
    }
  }, [status])

  //Typescript
  interface Value {
    date: string,
    end?: string,
    description: string,
    category: string,
    amount: number,
    frequency?: string
  }
  interface AgregarIngresos {
    id?: string,
    frequency: string,
    key: string,
    value: Value,
  }

  //Delete

  interface accountParameter {
    id?: string,
    type: string,
    frequency: string,
    value: any
  }

  interface keySelect {
    keyInput: string
  }

  const [input, setInput] = useState<Value>({
    category: '',
    description: '',
    amount: 0,
    date: '',
  });

  const [selectKey, setSelectKey] = useState<keySelect>({
    keyInput: '',
  })

  const [open, setOpen] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSelectInputs(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectKey({
      ...selectKey,
      keyInput: e.target.value
    })
  }

  function handleSelectCategories(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value, 'categorrrrri')
    setInput({
      ...input,
      category: e.target.value
    })
  }

  const form: AgregarIngresos = {
    frequency: selectKey.keyInput,
    key: 'input',
    value: input,
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {         //-----Form
    e.preventDefault();
    dispatch(addDato(form));
    setInput({
      category: '',
      description: '',
      amount: 0,
      date: ''
    })
    setSelectKey({
      keyInput: ''
    })
  }

  //Form de categorias

  interface Category {
    name: string,
    frequency: string,
    type: string,
    _id: {
      $oid: string
    }
  }

  //Form DELETE categorias
  // const [formCategoryDelete, setFormCategoryDelete] = useState<Category>({
  //   key: 'CategoriesInputs',
  //   value: ''
  // })

  // function handleChangeCategoryDelete(e: any) {
  //   setFormCategoryDelete({
  //     ...formCategoryDelete,
  //     value: e.target.value
  //   })
  // }

  // function handleSubmitCategoryDelete(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log(formCategoryDelete)
  //   dispatch(deleteCategory(formCategoryDelete))
  // }


  //Selects/button
  function handleDelete(event: accountParameter) {
    dispatch(deleteDato(event))
  }

  // function filterByMonth(e: any) {
  //   e.preventDefault();
  //   dispatch(inputsFilterByMonth(e.target.value))
  // }

  function handleOrderAmount(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    // dispatch(inputsOrderByAmount(e.target.value))
  }

  function handleOrderByCategories(e: any) {
    e.preventDefault();
    // dispatch(filterInputByCategory(e.target.value));
  }

  function handleOrderByFrequency(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(inputsFilterByFrequency(e.target.value))
  }

  function handleRefresh(e: any) {
    e.preventDefault();
    dispatch(renderInput(date))
  }

  //Paginado
  const [page, setPage] = useState(1);
  const [inputsPerPage, setinputsPerPage] = useState(5);

  const [pageLimit, setPageLimit] = useState(10);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const pageNumber = [];
  for (let i = 1; i <= renderInput.length && Math.ceil(renderInput.length / inputsPerPage); i++) {
    pageNumber.push(i)
  }

  const indice = pageNumber && pageNumber.map(pag => {
    if (pag <= maxPageLimit && pag > minPageLimit) {
      return <button className={pag === page ? stylesPag.active : styles.normal} onClick={() => setPage(pag)}>{pag}</button>
    } else return null;
  })

  const handlePrevButton = () => {
    setPage((prev) => prev === 1 ? prev : prev - 1);
    if (page !== 1 && (page - 1) % pageLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageLimit);
      setMinPageLimit(minPageLimit - pageLimit);
    }
  }

  const handleNextButton = () => {
    setPage((next) => next === pageNumber.length ? next : next + 1);
    if (page + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageLimit);
      setMinPageLimit(minPageLimit + pageLimit);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
      <Nav />
      <div className={styles.background}>
        <div className={styles.wrapperAllIngreso}>

          <div className={styles.title}>
            <h1>Tus Ingresos </h1>
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
                ['Salario', 'Préstamo', 'Herencia', 'Changa', 'Encontrado', 'Otros'].map(undefinedCategory => {
                  return (<option value={undefinedCategory}>{undefinedCategory}</option>)
                })
              }
              {
                usuario.categories.filter((category: Category) => category.type === 'input').map((category: Category) => {
                  return (<option value={category.name}>{category.name}</option>)
              })
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
              {renderInputs?.length > 0 ? renderInputs.slice((page - 1) * inputsPerPage, (page - 1) * inputsPerPage + inputsPerPage).map((detalles: any) => {
                return (
                  <tr className={styles.monthlyInput}>
                    <th><button onClick={() => handleDelete({ id: usuario._id, frequency: detalles.frequency, type: 'input', value: detalles })}></button></th>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                  </tr>)
              }) :   <th></th>
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
            <button className={page <= 1 ? stylesPag.disabledPrev : stylesPag.paginationPrev} onClick={() => handlePrevButton()}>Prev</button>
            {indice}
            <button className={page >= pageNumber.length ? stylesPag.disabledNext : stylesPag.paginationNext} onClick={() => handleNextButton()}>Next</button>
          </div>

          <div className={styles.wrapperForms}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form}>
                <select value={selectKey.keyInput} onChange={handleSelectInputs}>
                  <option>Selecciona el tipo</option>
                  <option value='monthly'>Ingreso fijo</option>
                  <option value='extra'>Ingreso extra</option>
                </select>

                <select value={input.category} onChange={handleSelectCategories}>
                  <option>Selecciona una categoría</option>
                  {
                    selectKey.keyInput ?
                      selectKey.keyInput === 'monthly'
                        ? ['Salario', 'Préstamo', 'Otros'].map(montInput => {
                          return (<option value={montInput}>{montInput}</option>)
                        })
                        : ['Changa', 'Herencia', 'Encontrado', 'Préstamo', 'Otros'].map(extraInput => {
                          return (<option value={extraInput}>{extraInput}</option>)
                        })
                      : ['Salario', 'Préstamo', 'Herencia', 'Changa', 'Encontrado', 'Otros'].map(undefinedCategory => {
                        return (<option value={undefinedCategory}>{undefinedCategory}</option>)
                      })
                  }
                  {selectKey.keyInput === 'monthly'
                    ? usuario.categories.filter((montInput: Category) => montInput.frequency === 'monthly' && montInput.type === 'input').map((montInput: Category) => {
                      return (<option value={montInput.name}>{montInput.name}</option>)
                    })
                    : usuario.categories.filter((extraInput: Category) => extraInput.frequency === 'extra' && extraInput.type === 'input').map((extraInput: Category) => {
                      return (<option value={extraInput.name}>{extraInput.name}</option>)
                    })
                  }
                </select>
                <input
                  type='text'
                  name='description'
                  value={input.description}
                  placeholder='Agrega una descripción'
                  onChange={handleChange}
                >
                </input>
                <label>$</label>
                <input
                  type='number'
                  name='amount'
                  min='0'
                  value={input.amount}
                  placeholder='Monto'
                  onChange={handleChange}
                  className={styles.amount}
                >
                </input>
                <input
                  type='date'
                  name='date'
                  value={input.date}
                  placeholder='Agrega una fecha'
                  onChange={handleChange}
                >
                </input>
                <button type='submit'>Agregar</button>
              </div>
            </form>
            {
                    input.category === 'Otros' 
                    && (<div>
                      <button onClick={() => setOpen(!open)}>Agregar una nueva casilla de ahorro</button>
                    <PopUp
                      open={open} 
                      setOpen={setOpen}
                      onClick={() => setOpen(open)}
                      title="Completa para agregar una categoría!">
                      <CategoryCreate/>
                    </PopUp>
                    </div> )
                  }
          </div>
        </div>
      </div>
    </div>
  )
}
