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
            {usuario.saving.length > 0
            ? usuario.saving.map( (s: SavingUser) => (
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
            : <h1>No tienes un monto, agrega</h1>
            }
          
          {/* EJEMPLO */}
          <div id='amount2' className={style.wrapperSave}>
              <div id='amount2' className={style.name}>
                {/* <h1>Nombre: <br/>{s.name}</h1> */}
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
                      <th>Objetivo</th>
                      <th>Total</th>
                      {/* <button onClick={handleDelete}>X</button> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>2022-09-13</th>
                      <th>Vacaciones Verano-2094</th>
                      {/* <th>{s.start}</th>
                    <th>{s.goal ? s.goal : "No tiene un objetivo"}</th>
                    <th>{s.amount}</th> */}
                      <th className={style.divAmount}><div className={style.amount}>$94.609</div></th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> 
          <SavesForm/>
        </div>
      </div>
    </div>
  )
}
