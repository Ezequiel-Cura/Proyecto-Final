import React from 'react';
import style from './Saves.module.css';
import Nav from 'components/Nav/Nav'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import SavesForm from './Form/SavesForm';
// import { addSaving, deleteSaving } from 'redux/reducers/userReducer';

export default function Saves() {
  const { usuario } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  console.log(usuario)

  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    place: string,
    currency: string,
    amount: number
  }

  function handleDelete(e : any) {
    e.preventDefault();
  }
  
  return (
    <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
      <Nav/>
      <div className={style.background}>
        <div className={style.wrapperAll}>

          <div className={style.title}>
            <h1>Ahorros</h1>
          </div>

          <div className={style.wrapperAllSaves}>
            {usuario.savings.length > 0
            ? usuario.savings.map( (s: SavingUser) => (
                <div id='amount1' className={style.wrapperSave}>
                  <div id='amount1' className={style.name}>
                    <div className={style.divP}>
                      <p>Nombre: </p>
                    </div>
                    <div className={style.divH1}>
                      <h1>Viaje</h1>
                    </div>
                  </div>
                  <div className={style.wrapperTable}>
                    <table className={style.table}>
                      <thead className={style.head}>
                        <tr>
                          <th>Comienzo</th>
                          <th>Descripcion</th>
                          <th>Total actual</th>
                          <th>Objetivo</th>
                          <button onClick={handleDelete}>X</button>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{s.start}</th>
                          <th>{s.goal ? s.goal : "No tiene una descripcion"}</th>
                          <th>Monto actual</th>
                          <th className={style.divAmount}><div className={style.amount}>{s.amount}</div></th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>))
            : <p>No tienes casillas de ahorros actualmente, agrega una!</p>
            }
          </div>

          <SavesForm/>
          
        </div>
      </div>
    </div>
  )
}
