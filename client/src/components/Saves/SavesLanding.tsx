import Nav from 'components/Nav/Nav';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from "./../Ingreso/Input.module.css";
import img from '../../assets/imgSaving.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import Saves from './Saves';
import { renderSaving } from 'redux/reducers/userReducer/userReducer';

export default function SavesLanding() {
  const { usuario, status, renderSavings } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'success'){
      dispatch(renderSaving());
    }
  }, [status])

  return (
    <div>
      { renderSavings.length > 0 
      ? <Saves/>
      :(<div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
          <Nav/>
          <div className={styles.wrapperText}>
            <h1>No tienes un monto de ahorro todavía?</h1>
            <div className={styles.wrapperLink}>
              <p>Añadí tus gastos e ingresos para obtener un detalle ahora!</p>
              <Link to="/home/saving/add">
                <button>+</button>
              </Link>
            </div>
            <img src={img} alt="not found"/>
          </div>
          </div>
        )
      }
    </div>
  )
}
