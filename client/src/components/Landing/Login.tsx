import styles from "./Landing.module.css"
import React from 'react'
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div>
         <div className={styles.formContainer}>
            <div className={styles.textContainer}>
                <h3>Bienvenido! Registrate</h3>
            </div>
            <form className={styles.form}>
            <input className={styles.input} style={{padding: "10px 20px"}} name="Email" type="text" placeholder="Email"/>
            <input className={styles.input} style={{padding: "10px 20px"}} name="Contraseña" type="password" placeholder="Contraseña"/>
            <div className={styles.buttons}>
                <div className={styles.checkboxContainer}>
                    <input id="recordarme" type="checkbox"/> 
                    <label htmlFor="recordarme" style={{marginTop: "2px"}}>Recordarme</label>
                </div>
                <div style={{display: "flex", marginTop: "2px", flexDirection: "row", alignItems: "top"}}>
                    <h4 style={{margin: "0px"}}>No tienes cuenta?</h4>
                    <Link to="/" state={{registered: false}} style={{marginLeft: "3px",textDecoration: 'none', color: "var(--btn-color)"}}>Registrate</Link>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Registrarme</button>
            </div>
            </form>
        </div> 
    </div>
  )
}