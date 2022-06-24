import styles from "./Ingreso.module.css";
import React, { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function ConDatos() {
  const { usuario, todosLosUsuarios } = useAppSelector( state => state.userReducer);
  const dispatch = useAppDispatch();
  console.log(usuario, 'Trae el ejemplo :D')
  console.log(todosLosUsuarios, 'No trae nada .-.')

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
      <div className={styles.wrapper}>
          <h1>Tus ingresos </h1>

          <div className={styles.selectOrder}>
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

          <div className={styles.meses}>
            {meses.map(mes => 
              (<a className={styles.cajaMes} id={mes.toLowerCase()} >{mes}</a>)
            )}
            <a className={styles.todos}>Todos</a>
          </div>

          <table className={styles.tabla}>
            <thead>
              <tr className={styles.titulo}>
                <th>Fecha</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {usuario.Account.monthlyInput.length && usuario.Account.monthlyInput.map( ingreso => (
                <tr>
                  <th>{ingreso.date.split("T")[0]}</th>
                  <th>{ingreso.description}</th>
                  <th>{ingreso.description}</th>
                  <th>$ {ingreso.amount}</th>
                  <th></th>
                </tr>
              ))}
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className={styles.monto}>$ {monto}</th>
              </tr>
            </tbody>
          </table>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <select name='category' onChange={(e) => handleSelect(e)}>
                <option>Selecciona una categoria</option>
                <option value='Alimentos'>Alimentos</option>
                <option value='Combustible'>Combustible</option>
                <option value='GastosPersonales'>Gastos personales</option>
                <option value='Gimnasio'>Gimnasio</option>
                <option value='Hobby'>Hobby</option>
                <option value='Indumentaria'>Indumentaria</option>
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
  )
}