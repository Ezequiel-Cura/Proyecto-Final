import styles from "./ConDatos.module.css";
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import Pagination from './Pagination';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function ConDatos() {
  const { usuario } = useAppSelector( state => state.user);
  const dispatch = useAppDispatch();
  console.log(usuario, 'Que trae del reducer')

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const [monto, setMonto] = useState<number>(89086);  //const total = setMonto(usuario.Account.monthlyInput[0].amount + monto)
  
  //----------Form-------------
  interface AgregarIngresos {    //objeto que se envia?
    description: string,
    category: string,
    amount: number,
  }

  const [input, setInput] = useState<AgregarIngresos> ({
    description: "",
    category: "",
    amount: 0,
  })

  function handleChange(e : any){     //cambia el estado de los input
    setInput((prevState) => {
        const newState = {              
            ...prevState,
            [e.target.name] : e.target.value
        };
        return newState;
    })
  }

  function handleOrderAmount( e : any){
    e.preventDefault();
    //dispatch(filterByAmount(e.target.value));
  }

  function handleOrderDate(e : any){
    e.preventDefault();
    //dispatch(filterByDate(e.target.value));
  }

  function handleSelect(e : any){     //cambia el estado de category
    setInput({
      ...input,
      category: e.target.value
  })
  }

  function handleSubmit(e : any){      //enviar form
    e.preventDefault();
    //dispatch(crearIngreso(input));
    setInput({
      description: "",
      category: "",
      amount: 0,
    });
  } 
  //----------------------

  useEffect(() => {
    //dispatch(loadMockUser());      //carga de user(ej Erik)
    //dispatch(setUser);
  }, [dispatch])

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
              {/* {usuario.Account.monthlyInput.length && usuario.Account.monthlyInput.map( ingreso => (
                <tr>
                  <th>{ingreso.date.split("T")[0]}</th>
                  <th>{ingreso.description}</th>
                  <th>{ingreso.description}</th>
                  <th>$ {ingreso.amount}</th>
                  <th></th>
                </tr>
              ))} */}
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

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <select name='category' onChange={(e) => handleSelect(e)}>
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
                placeholder='Agrega una descripcion'
                value={input.description} 
                onChange={(e) => handleChange(e)}
                >
              </input>
              <input 
                type='number' 
                name='amount'
                placeholder='Agrega un monto'
                value={input.amount} 
                onChange={(e) => handleChange(e)}
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