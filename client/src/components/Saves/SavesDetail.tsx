import Nav from 'components/Nav/Nav';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { deleteSaving } from 'redux/reducers/userReducer/actions/deleteSaving';
import AddSave from './Form/AddSave';

export default function SavesDetail() {
  const { usuario, allOutputs } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  let { id } = useParams();
  console.log(allOutputs, 'ALL OUTPUTS')

  interface Save {
    currency: string,
    depositPlace: string,
    end: string, 
    goal: number,
    name: string,
    start: string,
    _id: string
  }

  const detail = usuario.savings.find((el : Save) => el._id === id)

  const savingsList = allOutputs.filter(sav => sav.description === detail.name)
  console.log(savingsList, "Que chucha trajo")

  function handleDelete(e : any) {
    dispatch(deleteSaving(e))
  }
  
  return (
    <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
      <Nav/>
      <div>
        <div>
          <Link to={"/home/saving/add"}><button>Volver</button></Link>
          <h1>Detalle de "{detail.name}"</h1>
        </div>
        <div>
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
          <div>
            <h3>Meta</h3>
            <p>$ {detail.goal}</p>
          </div>
        </div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Monto</th>
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
                      <th><button>Delete</button></th>
                    </tr>
                  ))
                  : <p>No tienes movimientos en esta casilla</p>
                }
              </tbody>
            </table>
            <AddSave name={detail.name} />
          </div>
          <div>
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
            <h2>ARS $1.320.000</h2>
          </div>
        </div>
        <Link to={'/home/saving/add'}>
          <button onClick={() => handleDelete({value: detail})}>Elimina esta casilla de ahorro</button>
        </Link>
      </div>
    </div>
  )
}