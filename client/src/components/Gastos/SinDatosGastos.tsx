import styles from "../Ingreso/Ingreso.module.css";
import React from 'react';
import img from "../../assets/gastos.svg";
import { Link } from "react-router-dom";
import Nav from "components/Nav/Nav";

export default function SinDatos() {
    return (
      <div className={styles.wrapperAllIngreso}>
        <Nav/>
        <div className={styles.wrapperText}>
          <h1>Comienza a controlar tus <b>gastos</b></h1>
          <div className={styles.wrapperLink}>
            <p>Crea una nueva plantilla ahora!</p>
            <Link to="/home/gastos/add">
              <button>+</button>
            </Link>
          </div>
        </div>
        <div className={styles.wrapperImage}>
          <img src={img} alt="not found"/>
        </div>
      </div>
    )
  }