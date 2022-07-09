import React from 'react';
import style from './Saves.module.css';
import Nav from 'components/Nav/Nav'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import SavesForm from './Form/SavesForm';
import { deleteSaving } from 'redux/reducers/userReducer/actions/deleteSaving';
import { Link } from 'react-router-dom';

export default function Saves() {
  const { usuario } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const idColor = 0;

  interface SavingUser {
    _id: string,
    name: string,
    start: string,
    end: string,
    goal?: number,
    currentAmount: number,
    depositPlace: string,
    currency: string,
  }

  function handleDelete(e : any) {
    console.log(e, "e form")
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
              <div className={style.wrapperSaveDelete}>
                <Link to={`/home/saving/add/${s._id}`}>
                  <div id={'amount' + (idColor + 1)} className={style.wrapperSave}>
                    <div id={'amount' + (idColor + 1)} className={style.wrapperName1}>
                      <div className={style.divP}>
                        <p>Nombre: </p>
                      </div>
                      <div className={style.divH1}>
                        <h1>{s.name}</h1>
                      </div>
                    </div>
                    <div className={style.wrapperTable2}>
                      <table className={style.tableA}>
                        <thead className={style.head}>
                          <tr>
                            <th>Comienzo</th>
                            <th>Final</th>
                            <th>Lugar</th>
                            <th>Moneda</th>
                            <th>Actual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{s.start && s.start.split("T")[0]}</th>
                            <th>{s.end && s.end.split("T")[0]}</th>
                            <th>{s.depositPlace}</th>
                            <th>{s.currency}</th>
                            <th><div className={style.amount}>$ {s.currentAmount}</div></th>
                          </tr>
                        </tbody>
                      </table>
                      <div  id={'amount' + (idColor + 1)} className={style.wrapperGoalB}>
                        <h3>Meta</h3>
                        <p>$ {s.goal}</p>
                      </div>
                    </div>
                  </div>
                </Link> 
                <div className={style.divDelete3}>
                  <button onClick={() => handleDelete({value: s})}></button>
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
