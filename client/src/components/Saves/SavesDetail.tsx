import Nav from 'components/Nav/Nav';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addDato } from 'redux/reducers/userReducer/actions/addDato';
import { deleteDato } from 'redux/reducers/userReducer/actions/deleteDato';
import { deleteSaving } from 'redux/reducers/userReducer/actions/deleteSaving';
import AddSave from './Form/AddSave';
import style from './SavesDetail.module.css';

export default function SavesDetail() {
  const { usuario, allOutputs } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  let { id } = useParams();
  console.log(allOutputs, 'ALL OUTPUTS')

  interface Save {
    _id: string,
    name: string,
    start: string,
    end: string,
    goal?: number,
    currentAmount: number,
    depositPlace: string,
    currency: string,
  }

  const detail = usuario.savings.find((el : Save) => el._id === id)

  const savingsList = allOutputs.filter(sav => sav.description === detail.name)
  console.log(savingsList, "Que chucha trajo")



  function handleDeleteSave(e : any) {
    dispatch(deleteSaving(e));
    // savingsList.forEach( amount => dispatch(addDato({frequency:"extra", key: "input", value: amount})))
    // savingsList.forEach( amount => dispatch(deleteDato({frequency: amount.frequency, type: 'output', value: amount})))
  }

  function handleDeleteAmount(e: any) {
    dispatch(deleteDato(e))
    dispatch(addDato({frequency:"extra", key: "input", value: e.value}))
  }
  
  return (
    <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
      <Nav/>
      <div className={style.background}>
        <div className={style.wrapperAll}>
          <div className={style.wrapperHead}>

            <div className={style.title}>
              <Link to={"/home/saving/add"}><button></button></Link>
              <h1>Detalle de "{detail.name}"</h1>
            </div>

            <div className={style.wrapperDetail}>
              <div className={style.tableDetail}>
                <table>
                  <thead>
                    <tr>
                      <th>Comienzo</th>
                      <th>Moneda</th>
                      <th>Lugar</th>
                      <th>Monto actual</th>
                      <th>Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{detail.start && detail.start.split("T")[0]}</th>
                      <th>{detail.currency}</th>
                      <th>{detail.depositPlace}</th>
                      <th><div>$ {detail.currentAmount}</div></th>
                      <th>{detail.end && detail.end.split("T")[0]}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={style.tableGoal}>
                <h3>Meta</h3>
                <p>$ {detail.goal}</p>
              </div>
            </div>
          </div>

          <div className={style.wrapperBody}>
            <div className={style.divTableA}>
              <div className={style.moveTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Ahorrado/Sacado</th>
                      <th>Monto actual</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      savingsList.length > 0 ? savingsList.map( (save : any) => (
                        <tr>
                          <th>{save.date}</th>
                          <th>+ ${save.amount}</th>
                          <th>Total</th>
                          <th><button onClick={ () => handleDeleteAmount({frequency: save.frequency, type: 'output', value: save})}></button></th>
                        </tr>
                    ))
                    : (<tr>
                        <th><p>No tienes movimientos en esta casilla</p></th>
                      </tr>)
                    }
                  </tbody>
                </table>
              </div>

              <AddSave name={detail.name} currentAmount={detail.currentAmount}/>
            </div>

            <div className={style.divAmountB}>
              <div className={style.divCurrentConvert}>
                <p>Conoce tu monto de ahorro en otra moneda: </p>
                <select>
                  <option>Peso Argentino</option>
                  <option>Peso Uruguayo</option>
                  <option>Dolar</option>
                  <option>Euro</option>
                  <option>Libra Esterlina</option>
                  <option>Yen</option>
                  <option>Franco Suizo</option>
                </select>
                <h2>ARS</h2>
                <h3>$1.320.000</h3>
              </div>
            </div>

          </div>

          <div className={style.divButtonDelete}>
            <Link to={'/home/saving/add'}>
              <button onClick={() => handleDeleteSave({value: detail})}>Elimina este ahorro</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}