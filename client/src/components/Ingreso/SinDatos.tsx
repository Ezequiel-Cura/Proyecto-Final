import styles from "./Ingreso.module.css";
import React from 'react';
import img from "../../assets/ingreso.svg";
import { Link } from "react-router-dom";
import Nav from "components/Nav/Nav";

export default function SinDatos() {
    return (
      <div className={styles.wrapperAllIngreso}>
        <Nav/>
        <div className={styles.wrapperText}>
          <h1>Comienza a administrar tus <b>ingresos</b></h1>
          <div className={styles.wrapperLink}>
            <p>Crea una nueva plantilla ahora!</p>
            <Link to="/home/ingresos/add">
              <button>+</button>
            </Link>
          <img className={styles.img} src={img} alt="not found"/>
          </div>
        </div>
      </div>
    )
  }