import styles from "./Ingreso.module.css";
import React from 'react';
import Nav from "../Nav/Nav";
import img from "../../assets/ingreso.svg";
import { Link } from "react-router-dom";

export default function SinDatos() {
    return (
      <div className={styles.wrapper}>
          <h1>Comienza a administrar tus ingresos </h1>
          <p>Crea una nueva plantilla ahora!</p>
          <Link to="/home/ingresos/add">
              <div className={styles.add}>+</div>
          </Link>
          <img className={styles.image} src={img} alt="not found"/>
      </div>
    )
  }