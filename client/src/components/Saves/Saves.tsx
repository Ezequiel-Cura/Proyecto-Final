import React, { useState } from 'react';
import style from './Saves.module.css';
import Nav from 'components/Nav/Nav'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving, deleteSaving } from 'redux/reducers/userReducer';
import Drawer from '@mui/material/Drawer';
import SavesCreate from './SavesCreate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PopUp from './PopUp';

export default function Saves() {
  const { usuario } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  interface SavingUser {
    name: string,
    start: string,
    end: string,
    goal?: number,
    place: string,
    currency: string,
    amount: number
  }

  //Modal
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
        <Nav />
      <div className={style.background}>
        <div className={style.wrapperAll}>
          <div className={style.title}>
            <h1>Ahorros</h1>
          </div>

          {/* {
          usuario.Saving.length > 0
          usuario.Saving.map( (s: SavingUser) => ( */}
          <div className={style.wrapperAllSaves}>

            <div id='amount1' className={style.wrapperSave}>
              <div id='amount1' className={style.name}>
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

          <button className={style.wrapperNewSave} onClick={() => setOpen(!open)}>Agregar una nueva casilla de ahorro</button>
          <PopUp
            open={open} 
            setOpen={setOpen}
            onClick={() => setOpen(open)}
            title="Completa para agregar una casilla de ahorro!">
            <SavesCreate/>
          </PopUp>

        </div>
      </div>
    </div>
  )
}
