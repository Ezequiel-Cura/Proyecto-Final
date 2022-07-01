import Nav from 'components/Nav/Nav';
import React from 'react';
import { Link } from "react-router-dom";
import styles from "./../Ingreso/Ingreso.module.css";

export default function SavesLanding() {
  return (
    <div className={styles.wrapperAllIngreso}>
      <Nav />
      <div className={styles.wrapperText}>
        <h1>No tienes un monto de ahorro todavía?</h1>
        <div className={styles.wrapperLink}>
          <p>Añadí tus gastos e ingresos para obtener un detalle ahora</p>
          <Link to="/home/saving/add">
            <button>+</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
