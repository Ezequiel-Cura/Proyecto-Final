import styles from "./Landing.module.css"
import React from 'react'
import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.textContainer}>
        <h3>Bienvenido! Registrate</h3>
      </div>
      <form className={styles.form}>
        <input className={styles.input} name="firstName" type="text" placeholder="Nombre"/>
        <input className={styles.input} name="lastName" type="text" placeholder="Apellido"/>
        <input className={styles.input} name="Email" type="text" placeholder="Email"/>
        <input className={styles.input} name="Contraseña" type="password" placeholder="Contraseña"/>
        <div className={styles.buttons}>
          <div>
            <input id="recordarme" type="checkbox"/> <label htmlFor="recordarme">Recordarme</label>
          </div>
          <div style={{display: "flex", marginTop: "2px", flexDirection: "row", alignItems: "top"}}>
            <h4 style={{margin: "0px"}}>Ya tienes cuenta?</h4>
            <Link to="/" state={{registered: true}} style={{marginLeft: "3px",textDecoration: 'none', color: "var(--btn-color)"}}>Logueate</Link>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Registrarme</button>
        </div>
      </form>
  </div> 
  )
}
