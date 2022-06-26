import styles from "../Ingreso/ConDatos.module.css";
import React, { useState } from 'react';
import Nav from "../Nav/Nav";
import Pagination from "components/Ingreso/Pagination";
// import { useAppSelector } from "../../redux/hooks";

export default function ConDatos() {
//   const { usuario } = useAppSelector( state => state.user);

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const [monto, setMonto] = useState<number>(5756756);
  
  return (
    <div>
      <Nav/>
      <div className={styles.background}>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.title}>
            <h1>Tus Gastos </h1>
          </div>

          <div className={styles.selectsOrder}>
            <select>
              <option>Ordenar por monto</option>
              <option value='desc'>De mayor a menor</option>
              <option value='asc'>De menor a mayor</option>
            </select>
            <select>
              <option>Ordenar por fecha</option>
              <option value='desc'>De mayor a menor</option>
              <option value='asc'>De menor a mayor</option>
            </select>
          </div>

          <div className={styles.allMonths}>
            <div className={styles.monthCard}>
              {meses.map(months => 
                (<button className={styles.months} id={months}>{months}</button>)
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
                <th className={styles.lastBox}></th>
                <th></th>
                <th></th>
                <th className={styles.totalAmount}><b>Total: ${monto}</b></th>
                <th className={styles.vacia}></th>
              </tr>
            </tbody>
          </table>

          <Pagination/>

          <form>
            <div className={styles.form}>
              <select name='category'>
                <option>Selecciona una categoria</option>
                <option value='Alimentos'>Alimentos</option>
                <option value='Gimnasio'>Gimnasio</option>
                <option value='Salud'>Salud</option>
                <option value='Hobby'>Hobby</option>
                <option value='Ocio'>Ocio</option>
                <option value='Combustible'>Combustible</option>
                <option value='Otros'>Otros</option>
              </select>
              <input 
                type='text' 
                name='description'
                placeholder='Agrega una descripcion'
                >
              </input>
              <input 
                type='number' 
                name='amount'
                placeholder='Agrega un monto'
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