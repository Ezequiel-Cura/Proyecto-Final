import React, { useEffect, useState } from 'react';
import style from './Css/Saves.module.css';
import Nav from 'components/Nav/Nav'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import SavesForm from './Form/SavesForm';
import { Link } from 'react-router-dom';
import ConfirmDelete from './Delete/ConfirmDelete';
import PopUpDelete from './Delete/PopUpDelete';
import { clearCurrency } from 'redux/reducers/userReducer/userReducer';

export default function Saves() {
  const { usuario, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success') {
      dispatch(clearCurrency())
    }
  }, [status])// eslint-disable-line

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

  const [open, setOpen] = useState<boolean>(false);

  
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
              <div className={style.wrapperSave} key={s._id}>
                <Link to={`/home/saving/add/${s._id}`}>
                  <div className={style.wrapperSaveLink}>

                    <div className={style.wrapperName1}>
                      <div className={style.divP}>
                        <p>Nombre: </p>
                      </div>
                      <div className={style.divH1}>
                        <h1>{s.name}</h1>
                      </div>
                    </div>

                    <div className={style.wrapperTable2}>
                      <table className={style.tableA}>
                        <thead>
                          <tr>
                            <th>Comienzo</th>
                            <th>Final</th>
                            <th>Lugar</th>
                            <th>Moneda</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{s.start && s.start.split("T")[0]}</th>
                            <th>{s.end && s.end.split("T")[0]}</th>
                            <th>{s.depositPlace}</th>
                            <th>{s.currency}</th>
                          </tr>
                        </tbody>
                      </table>
                      <div className={style.wrapperGoalB}>
                        <h3>Meta</h3>
                        <p>$ {s.goal}</p>
                      </div>
                    </div>
                  </div>
                </Link> 
                <div className={style.divDelete}>
                  <button onClick={() => setOpen(!open)}></button>
                  <PopUpDelete
                  open={open} 
                  setOpen={setOpen}
                  onClick={() => setOpen(open)}
                  >
                    <ConfirmDelete
                    open={open}
                    setOpen={setOpen}
                    data={{value: s}}
                    />
                  </PopUpDelete>
                </div>

              </div>))
            : (<div className={style.divNothing}> 
              <p>No tienes casillas de ahorros</p>
              </div>)
            }
          </div>

          <SavesForm/>

        </div>
      </div>
    </div>
  )
}
