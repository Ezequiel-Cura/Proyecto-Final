import React from 'react';
import style from './Saves.module.css';
import Nav from 'components/Nav/Nav'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import SavesForm from './Form/SavesForm';
import { deleteSaving } from 'redux/modules/deleteSaving';

export default function Saves() {
  const { usuario } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    depositPlace: string,
    currency: string,
  }

  function handleDelete(e : any) {
    dispatch(deleteSaving(e))
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
                      <h1>{s.name}</h1>
                    </div>
                  </div>
                  <div className={style.wrapperTable}>
                    <table className={style.table}>
                      <thead className={style.head}>
                        <tr>
                          <th>Comienzo</th>
                          <th>Final</th>
                          <th>Moneda</th>
                          <th>Total actual</th>
                          <th>Objetivo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{s.start && s.start.split("T")[0]}</th>
                          <th>{s.end && s.end.split("T")[0]}</th>
                          <th>{s.currency}</th>
                          <th>{s.depositPlace}</th>
                          <th className={style.divAmount}><div className={style.amount}>{s.goal}</div></th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button onClick={() => handleDelete({value: s})}>X</button>
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
