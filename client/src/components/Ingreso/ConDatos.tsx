import styles from "./ConDatos.module.css";
import stylesPag from "./Pagination.module.css"
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addDato, deleteDato, getAllInputs, inputsFilterByMonth, inputsOrderByAmount, inputsFilterByFrequency, filterInputByCategory, totalInput } from "redux/reducers/userReducer";
//-------------------------
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableFooter from '@mui/material/TableFooter';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';


export default function ConDatos() {
  const { usuario, allInputs, totalInputsMonth, status } = useAppSelector(state => state.user);
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
    key: string,             
    value: Value,
  }

  //Delete:-----------------
  interface idUndefined {
    _id: string | undefined
  }

  interface accountParameter {
    id?: string,
    key: keyValue,
    value: idUndefined
  }
   //-----------------------

  const [input, setInput] = useState<Value>({
    category: '',
    description: '',
    amount: 0,
  })

  //---------------------------
  interface keySelect {
    keyInput: string
  }

  const [selectKey, setSelectKey] = useState<keySelect>({
    keyInput: '', 
  })
   //---------------------------
  
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

  // const form: AgregarIngresos = {
  //   key: 'extraInput',
  //   value: input,
  // }

  const clearForm = () => {
    setInput({
      category: '',
      description: '',
      amount: 0,
      date: ''
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(form, 'foooorm')
    e.preventDefault();
    dispatch(addDato(form));
    clearForm();
  }
  //----------------------

  function handleDelete(event: accountParameter) {
    // event.preventDefault();
    console.log(event)
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

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setinputsPerPage(+event.target.value);
  //   setPage(0);
  // };

  //---------------------------------------------------------------
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
              //Erik agrego la propiedad "Source" pero no se agrega en lo que viene
              // detalles.source === 'monthlyInput' 
              // ? (<tr className={styles.monthlyInput}>
              //   <th>{detalles.date && detalles.date.split("T")[0]}</th>
              //   <th>{detalles.category ? detalles.category : "-"}</th>
              //   <th>{detalles.description}</th>
              //   <th>$ {detalles.amount}</th>
              //   <th><button onClick={() => handleDelete({ id: usuario._id, key: 'monthlyInput', value: { _id: detalles._id } })}></button></th>
              // </tr>)
              // : (
              //   <tr>
              //       <th>{detalles.date && detalles.date.split("T")[0]}</th>
              //       <th>{detalles.category ? detalles.category : "-"}</th>
              //       <th>{detalles.description}</th>
              //       <th>$ {detalles.amount}</th>
              //       <th><button onClick={() => handleDelete({ id: usuario._id, key: 'monthlyInput', value: { _id: detalles._id } })}></button></th>
              //     </tr>
              // )
                console.log(allInputs, 'Allinputs')
                return (
                  <tr>
                    <th><button onClick={() => handleDelete({ id: usuario._id, key: 'extraInput', value: { _id: detalles._id } })}></button></th>
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
                <th className={styles.totalAmount}><b>Total: ${totalInputsMonth}</b></th>
              </tr>
            </tbody>
          </table> 
          
          <div className={stylesPag.wrapperPag}>
            <button className={page <= 1 ? stylesPag.disabledPrev : stylesPag.paginationPrev } onClick={() => handlePrevButton()}>Prev</button>
            {indice}
            <button className={page >= pageNumber.length ? stylesPag.disabledNext : stylesPag.paginationNext } onClick={() => handleNextButton()}>Next</button>
          </div>

        {/* //----------------------------------------------------------------------- */}
        {/* <TableContainer component={Paper} className={styles.table}>
          <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className={styles.head}>
              <TableRow>
                <TableCell align="center">nn</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Categoria</TableCell>
                <TableCell align="center">Descripción</TableCell>
                <TableCell align="center">Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allInputs.length > 0 ? allInputs.slice(page * inputsPerPage, page * inputsPerPage + inputsPerPage).map((detalles: Value) => {
                return (
                  <TableRow>
                    <TableCell align="center"><IconButton aria-label="delete" onClick={() => handleDelete({ id: usuario._id, key: 'extraInput', value: { _id: detalles._id } })}>
                      <DeleteIcon fontSize="inherit"/>
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">{detalles.date && detalles.date.split("T")[0]}</TableCell>
                    <TableCell align="center">{detalles.category ? detalles.category : "-"}</TableCell>
                    <TableCell align="center">{detalles.description}</TableCell>
                    <TableCell align="center">$ {detalles.amount}</TableCell>
                  </TableRow>
                )
              }) 
              : <TableCell></TableCell>
              }
              <TableRow>
                <TableCell className={styles.lastBox}></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center" className={styles.totalAmount}><b>Total: ${totalInputsMonth}</b></TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={allInputs.length}
                  rowsPerPage={inputsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer> */}

          {/* //----------------------------------------------------------------------- */}

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
