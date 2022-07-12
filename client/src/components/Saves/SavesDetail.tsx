import Nav from 'components/Nav/Nav';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addDato } from 'redux/reducers/userReducer/actions/addDato';
import { deleteDato } from 'redux/reducers/userReducer/actions/deleteDato';
import { deleteSaving } from 'redux/reducers/userReducer/actions/deleteSaving';
import { getCurrency } from 'redux/reducers/userReducer/actions/getCurrency';
import { renderOutput, totalSave } from 'redux/reducers/userReducer/userReducer';
import AddSave from './Form/AddSave';
import style from './SavesDetail.module.css';

export default function SavesDetail() {
  const { usuario,status, allOutputs, totalSaving, dataCurrency } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  let { id } = useParams();

  //Si se agrega un nombre repetido en las casillas "ahorro" se pisan
  //Mensaje de que logro la meta
  //


  const [date, setDate] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`)
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

  useEffect(() => {
    if (status === 'success') {
      dispatch(renderOutput(date))
      dispatch(totalSave(detail))
    }
  }, [status])


  const detail = usuario.savings.find((el : Save) => el._id === id)

  const savingsList = allOutputs.filter(sav => sav.description === detail.name)
  console.log(dataCurrency,"currency")

  // let total = 0
  // const totalAmount = savingsList.forEach(el => total += el.amount)
  
  // savingsList.forEach( amount => dispatch(addDato({frequency:"extra", key: "input", value: amount})))
  // savingsList.forEach( amount => dispatch(deleteDato({frequency: amount.frequency, type: 'output', value: amount})))

  function handleDeleteSave(e : any) {
    dispatch(deleteSaving(e));
  }

  function handleDeleteAmount(e: any) {
    dispatch(deleteDato(e))
    dispatch(addDato({frequency:"extra", key: "input", value: e.value}))
  }

  interface SelectCurrent {
    to: string,
  }

  const [select, setSelect] = useState<SelectCurrent>({
    to: '',
  })

  function handleSelectCurrent(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e, "select e")
    setSelect({
      ...select,
      to: e.target.value
    })
  }

  interface current {
    to: string,
    from: string, 
    amount: number
  }

  const form: current = {
    to: select.to,
    from: detail.currency,
    amount: totalSaving
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form, 'form current')
    dispatch(getCurrency(form));
    setSelect({
      to: ''
    })
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
                      <th>$ {totalSaving}</th>
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
                      <th>Ahorrado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      savingsList.length > 0 ? savingsList.map( (save : any) => (
                        <tr>
                          <th>{save.date}</th>
                          <th>+ ${save.amount}</th>
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
                <form onSubmit={handleSubmit}>
                  <select onChange={handleSelectCurrent}>
                    <option value=''>Selecciona el tipo</option>
                    <option value="ARS">Peso Argentino</option>
                    <option value="UYU">Peso Uruguayo</option>
                    <option value="USD">Dolar</option>
                    <option value="EUR">Euro</option>
                    <option value="LBP">Libra Esterlina</option>
                    <option value="JPY">Yen</option>
                    <option value="CHF">Franco Suizo</option>
                  </select>
                  <button type='submit'>Calcular</button>
                </form>
                {
                  dataCurrency.query
                  ? <h2>{dataCurrency.query.to}</h2>
                  : <h2>{detail.currency}</h2>
                }
                {
                  dataCurrency.result
                  ? <h3> $ {parseFloat(dataCurrency.result).toFixed(2)}</h3> 
                  : <h3>$ {totalSaving}</h3>
                }
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