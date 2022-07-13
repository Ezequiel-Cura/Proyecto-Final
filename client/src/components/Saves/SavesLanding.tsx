import Nav from 'components/Nav/Nav';
import React from 'react';
import { Link } from "react-router-dom";
import styles from "./../Ingreso/Input.module.css";
import img from '../../assets/imgSaving.svg';
import { useAppSelector } from 'redux/hooks';
import Saves from './Saves';

export default function SavesLanding() {
  const { usuario } = useAppSelector(state => state.user);

  return (
    <div>
      { usuario.savings.length > 0 
      ? <Saves/>
      :(<div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
          <Nav/>
          <div className={styles.wrapperAllIngreso}>
            <div className={styles.wrapperText}>
              <h1>No tienes un monto de <b>ahorro</b> todavía?</h1>
              <div className={styles.wrapperLink}>
                <p>Añadí tus gastos e ingresos para obtener un detalle ahora!</p>
                <Link to="/home/saving/add">
                  <button>+</button>
                </Link>
              </div>
            </div>
            <div className={styles.wrapperImg2}>
              <img src={img} alt="not found"/>
            </div>
          </div>
        </div>
        )
      }
    </div>
  )
}
