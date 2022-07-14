import styles from "../Ingreso/Input.module.css";
import React from 'react';
import img from "../../assets/imgExpenses.svg";
import { Link } from "react-router-dom";
import Nav from "components/Nav/Nav";

export default function ExpensesLanding() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
        <Nav/>
        <div className={styles.wrapperAllIngreso}>
          <div className={styles.wrapperText}>
            <h1>Comienza a controlar tus <b>gastos</b></h1>
            <div className={styles.wrapperLink}>
              <p>Crea una nueva plantilla ahora!</p>
              <Link to="/home/gastos/add">
                <button>+</button>
              </Link>
            </div>
          </div>
          <div className={styles.wrapperImg}>
            <img className={styles.img} src={img} alt="not found"/>
          </div>
        </div>
      </div>
    )
  }