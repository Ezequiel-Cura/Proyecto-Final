import styles from "../Ingreso/Tables.module.css";
import stylesPag from "../Ingreso/Pagination.module.css"
import React, { useState, useEffect, useRef } from 'react';
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeOptions, clearChangeOptions, expensesOrderByAmount, filterOutputByOptions, renderOutput, totalOutput } from "redux/reducers/userReducer/userReducer";
import { addDato } from 'redux/reducers/userReducer/actions/addDato'
import { deleteDato } from 'redux/reducers/userReducer/actions/deleteDato'
import PopUp from "components/Saves/Form/PopUp";
import CategoryCreate from "components/Category/CategoryCreate";
import { deleteCategory } from "redux/reducers/userReducer/actions/deleteCategory";


export default function ExpensesTable() {
  const { usuario, renderOutputs, totalOutputsMonth, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const today = `${new Date().getFullYear()}-${((new Date().getMonth() + 1) < 10) ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${(new Date().getDate() < 10) ? '0' + new Date().getDate() : new Date().getDate()}`
  const [date, ] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`)

  useEffect(() => {
    if (status === 'success') {
      dispatch(renderOutput(date))
      dispatch(totalOutput())
      dispatch(clearChangeOptions())
    };
  }, [status, dispatch, date])

    // Interfaces
  interface AgregarGastos {
    id?: string,
    frequency: string,             
    key: string,
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
  interface Month {
    nameMonth: string,
  }

  interface Year {
    numberYear: string
  }
  interface keySelect {
    frequency: string
  }
  //-----------------------

  const [input, setInput] = useState<Value>({
    category: '',
    description: '',
    amount: 0,
    date: today,
  })

  const [selectKey, setSelectKey] = useState<keySelect>({
    frequency: '',
  })  

  //Render Date
  const [month, setMonth] = useState<Month>({
    nameMonth: '',
  })

  const [year, setYear ] =useState<Year>({// eslint-disable-line
    numberYear: ''
  })
  //---------------

  // Validation

  const firstRender = useRef(true)

  const [valMsg, setMsg] = useState('')
  const [valDisable, setDisabled] = useState(true)

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false
      return
    }

    !selectKey.frequency ? setMsg('Proporcione un tipo') :
      !input.category ? setMsg('Proporcione una categoria') :
        !input.description ? setMsg('Proporcione una descripcion') :
          !input.amount ? setMsg('Proporcione un monto') :
            setMsg('')


  }, [input, selectKey])

  useEffect(() => {
    setDisabled(valMsg === '' ? false : true)
  }, [valMsg])

  //-----------------------------------
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSelectI(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectKey({
      ...input,
      frequency: e.target.value
    })
  }

  function handleSelectC(e: React.ChangeEvent<HTMLSelectElement>) {
    setInput({
      ...input,
      category: e.target.value
    })
  }

  const form: AgregarGastos = {
    frequency: selectKey.frequency,
    key: 'output',
    value: input,
  }

  const [open, setOpen] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addDato(form));
    setInput({
      category: '',
      description: '',
      amount: 0,
      date: today
    })
    setSelectKey({
      frequency: ''
    })
    resetAll()
  }

  function handleDelete(event: any) {
    dispatch(deleteDato(event))
  }


  function filterByMonth(e: any) {
    e.preventDefault();
    setMonth({nameMonth: e.target.value})
    dispatch(changeOptions(['month', e.target.value]))
    dispatch(filterOutputByOptions())
    dispatch(totalOutput())
  }

  function handleOrderAmount(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(expensesOrderByAmount(e.target.value))
  }

  function handleOrderByCategories(e: any) {
    e.preventDefault();
    dispatch(changeOptions(['category', e.target.value]))
    dispatch(filterOutputByOptions())
    dispatch(totalOutput())
  }

  function handleFilterByFrequency(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch(changeOptions(['frequency', e.target.value]))
    dispatch(filterOutputByOptions())
    dispatch(totalOutput())
  }

	const options = useAppSelector(state => state.user.options)
	function handleFilterByYear(op: string) {
		const year = Number(options.year)

		dispatch(changeOptions([
			'year',
			op === '+' ? (year + 1).toString() :
			op === '-' ? (year - 1).toString() :
			today.split('-')[0]
		]))
		dispatch(filterOutputByOptions())
		dispatch(totalOutput())
  }

  function resetAll() {
    (document.getElementById("selectCategories") as HTMLFormElement).value = 'default';
    (document.getElementById("selectFrequency") as HTMLFormElement).value = 'default';
    (document.getElementById("selectYear") as HTMLFormElement).value = ''
  }

  function handleRefresh(e: any) {
    e.preventDefault();
    dispatch(renderOutput(date))
    dispatch(totalOutput())
    dispatch(clearChangeOptions())
    return resetAll()
  }

  //Paginado---------------------------------------------------------------
  const [page, setPage] = useState(1);            
  const [inputsPerPage,] = useState(6);           

  const [pageLimit,] = useState(10);  
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(renderOutputs.length / inputsPerPage); i++) {
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

  const catFilterArr = () => {

    let returnArr: Array<string> = []
    const mOutput = usuario?.monthly.output
    const eOutput = usuario.extra.output.map((e: any) => e.entries)
    const aOutput = eOutput.concat(mOutput).flat()
    const catArr = aOutput.map((e: any) => e.category)
    catArr.forEach((e: any) => {
      if (!returnArr.includes(e)) {
        returnArr.push(e)
      }
    })
    return returnArr
  }

  const defVals = ['Alquiler', 'Deuda', 'Impuestos', 'Salud', 'Viaje', 'Regalo', 'Super', 'Transporte', 'Restaurante', 'Vestimenta', 'Shopping', '', 'Crear']

  const handleCategoryDelete = (e: any) => {
    e.preventDefault()
    const prompt = window.confirm('Seguro que deseas borrar esta categoria?')
    if (prompt) {
      const delCat = usuario.categories.find((e: any) => e.name === input.category)
      dispatch(deleteCategory(delCat._id))
      setInput({ ...input, category: '' })
    } else {
      return
    }
  }


  return (
    <div className={styles.background}>
      <Nav />
      {/* Title */}
      <div className={styles.wrapperAllIngreso}>
        <div className={styles.title}>
          <h1>Tus Gastos:</h1>
          <p>{renderOutputs.length > 0 ? "Año: " + (renderOutputs[0].date.split("-")[0]) + " - Mes: " + renderOutputs[0].date.split("-")[1] : (year.numberYear === "" ? "Año: 2022": "Año: " + year.numberYear) + " - Mes: " + month.nameMonth}</p> 
        </div>

        {/* Order */}
        <div className={styles.selectsOrder}>
          <select onChange={(e) => handleOrderAmount(e)}>
            <option value='default'>Ordenar por monto</option>
            <option value='mayorAMenor'>De mayor a menor</option>
            <option value='menorAMayor'>De menor a mayor</option>
          </select>


          <select id='selectCategories' onChange={(e) => handleOrderByCategories(e)} >
            <option value='default'>Ordenar por categoria</option>
            {
              catFilterArr().map((e: any) => {
                return (<option value={e} key={e}>{e}</option>)
              })
            }
            <option value='Ahorros' className={styles.Ahorros}>Ahorros</option>
          </select>

          

          <select id='selectFrequency' onChange={(e) => handleFilterByFrequency(e)}>
            <option value='default'>Ordenar por frecuencia</option>
            <option value='monthly'>Gasto fijo</option>
            <option value='extra'>Gasto variable</option>
          </select>

          <div className={styles.yearSelect}>
							<button className={styles.yearLeft} onClick={() => handleFilterByYear('-')}>{'<'}</button>
							<button className={styles.yearCenter} onClick={() => handleFilterByYear('')}>{options.year}</button>
							<button className={styles.yearRight} onClick={() => handleFilterByYear('+')}>{'>'}</button>
					</div>
          
          {/* <select id='selectYear' onChange={(e) => handleFilterByYear(e)}> */}
            {/* <option value=''>Ordenar por año</option>
            {
                ['2020', '2021', '2022', '2023', '2024', '2025'].map( (year: string) => {
                  return(
                    <option value={year}>{year}</option>
                  )
                })
              }
          </select> */}

        </div>

        {/* Month */}

        <div className={styles.allMonths}>
          <div className={styles.monthCard}>
            {
              ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(
                (month, i) => {
                  return (<button value={i < 9 ? `0${i + 1}` : `${i + 1}`} className={styles.months} id={month} onClick={(e) => filterByMonth(e)}>{month}</button>
                  )
                }
              )
            }
          </div>
          <div className={styles.annualCard}>
            <button className={styles.annual} onClick={handleRefresh}>Refresh</button>
          </div>
        </div>

        {/* Table */}
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>Frecuencia</th>
              <th>Fecha</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderOutputs.length > 0 ? renderOutputs.slice((page - 1) * inputsPerPage, (page - 1) * inputsPerPage + inputsPerPage).map((detalles: any) => {
              return (
                detalles.frequency === 'monthly' ?
                  <tr className={styles.monthlyInput} key={detalles._id}>
                    <th>Gasto fijo</th>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category.charAt(0).toUpperCase() + detalles.category.slice(1).toLowerCase() : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button onClick={() => handleDelete({ frequency: detalles.frequency, type: 'output', value: detalles })}></button></th>
                  </tr>
                  : <tr key={detalles._id}>
                    <th>Gasto extra</th>
                    <th>{detalles.date && detalles.date.split("T")[0]}</th>
                    <th>{detalles.category ? detalles.category.charAt(0).toUpperCase() + detalles.category.slice(1).toLowerCase() : "-"}</th>
                    <th>{detalles.description}</th>
                    <th>$ {detalles.amount}</th>
                    <th><button onClick={() => handleDelete({ frequency: detalles.frequency, type: 'output', value: detalles })}></button></th>
                  </tr>
              )
            })
              : <></>
            }
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th className={styles.totalAmount}><b>Total: ${totalOutputsMonth}</b></th>
              <th className={styles.lastBox}></th>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className={stylesPag.wrapperPag}>
          <button className={page <= 1 ? stylesPag.disabledPrev : stylesPag.paginationPrev} onClick={() => handlePrevButton()}>Prev</button>
          {indice}
          <button className={page >= pageNumber.length ? stylesPag.disabledNext : stylesPag.paginationNext} onClick={() => handleNextButton()}>Next</button>
        </div>

        {/* Creation form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <select value={selectKey.frequency} onChange={handleSelectI}>
              <option value='' disabled={true}>Selecciona el tipo</option>
              <option value='monthly'>Gasto fijo</option>
              <option value='extra'>Gasto variable</option>
            </select>

            <select value={input.category} onChange={handleSelectC}>
              <option value='' disabled={true}>Selecciona una categoría</option>
              {
                selectKey.frequency ?
                  selectKey.frequency === 'monthly' ?
                    ['Transporte', 'Alquiler', 'Deuda', 'Impuestos', 'Salud', 'Viaje'].map(montOutput => {
                      return (<option value={montOutput}>{montOutput}</option>)
                    }) :
                    ['Regalo', 'Super', 'Transporte', 'Salud', 'Viaje', 'Restaurante', 'Vestimenta', 'Shopping'].map(extraOutput => {
                      return (<option value={extraOutput}>{extraOutput}</option>)
                    }) :
                  <></>
              }
              {selectKey.frequency ?
                selectKey.frequency === 'monthly' && usuario.categories.length > 0 ?
                  usuario.categories.filter((montOutput: Category) => montOutput.frequency === 'monthly' && montOutput.type === 'output').map((montOutput: Category) => {
                    return (<option value={montOutput.name}>{montOutput.name.charAt(0).toUpperCase() + montOutput.name.slice(1).toLowerCase()}</option>)
                  }) :
                  usuario.categories.filter((extraOutput: Category) => extraOutput.frequency === 'extra' && extraOutput.type === 'output').map((extraOutput: Category) => {
                    return (<option value={extraOutput.name}>{extraOutput.name.charAt(0).toUpperCase() + extraOutput.name.slice(1).toLowerCase()}</option>)
                  }) :
                <></>
              }
              <option value='Crear' className={styles.Crear}>Crear</option>
            </select>
            <input
              type='text'
              name='description'
              value={input.description}
              placeholder='Agrega una descripcion'
              onChange={handleChange}
            >
            </input>
            <label>$</label>
            <input
              type='number'
              name='amount'
              value={input.amount}
              placeholder='Agrega un monto'
              onChange={handleChange}
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
            <button type='submit' disabled={valDisable}>Agregar</button>
          </div>
        </form>

        {/* Error Display */}
        <span id="validateError" className={styles.errorForm}>{valMsg}</span>
        <br />

        {
          !defVals.includes(input.category) ? <button className={styles.catDeleteButton} onClick={(e: any) => handleCategoryDelete(e)}>Borrar Categoria?</button> : <></>
        }

        {/* Category Creation */}
        {
          input.category === 'Crear'
          && (<div className={styles.CrearDiv}>
            <button onClick={() => setOpen(!open)} className={styles.CrearButton}>Agregar una nueva categoría</button>
            <PopUp
              open={open}
              setOpen={setOpen}
              onClick={() => setOpen(open)}
              title="Completa para agregar una categoría!">
              <CategoryCreate
                open={open}
                setOpen={setOpen}
              />
            </PopUp>
          </div>)
        }
      </div>
    </div>
  )
}
