import React, { useState } from 'react';
import style from './Saves.module.css';
import Nav from 'components/Nav/Nav'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving, deleteSaving } from 'redux/reducers/userReducer';
import Drawer from '@mui/material/Drawer';
import SavesCreate from './SavesCreate';

export default function Saves() {

  const { usuario } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState<boolean>(false)


  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    place: string,
    currency: string,
    amount: number
  }
  // Shows or hide the Drawer
  const handleToggle = () => setShowForm(!showForm);

  // Closes the drawer
  const handleClose = () => setShowForm(false);

  function handleDelete() {
    dispatch(deleteSaving())
  }
  return (
    <div>
      <Nav />
      <div className={style.background}>
        <div className={style.wrapperAll}>
          <div className={style.title}>
            <h1>Ahorro</h1>
          </div>

          {/* {
          usuario.Saving.length > 0
          usuario.Saving.map( (s: SavingUser) => ( */}
          <div className={style.wrapperAllSaves}>
            <div className={style.wrapperSave}>
              <div className={style.name}>
                {/* <h1>Nombre: <br/>{s.name}</h1> */}
                <p>Nombre: </p>
                <h1>Viaje</h1>
              </div>
              <div className={style.wrapperTable}>
                <table className={style.table}>
                  <thead className={style.head}>
                    <tr>
                      <th>Comienzo</th>
                      <th>Objetivo</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      {/* <th>{s.start}</th>
                    <th>{s.goal ? s.goal : "No tiene un objetivo"}</th>
                    <th>{s.amount}</th> */}
                      <button onClick={handleDelete}>X</button>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* ))
           : <h1>Todavia no creaste un ahorro</h1>
          } */}
          <div className={style.wrapperNewSave}>
            <p>Agregar nueva casilla de ahorro</p>
            <button onClick={() => {
              return (
  
                <SavesCreate/>
                
              )
            }}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}