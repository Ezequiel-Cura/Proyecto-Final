import styles from "./Landing.module.css"
import { Link, useLocation } from "react-router-dom";
import React from 'react';



export default function Landing() {
    const {state} : any= useLocation()
    console.log(state?.register)
  return (
    <>
    <div className={styles.wrapper}/>
        <div className={styles.welcome}><h1>Bienvenidos a Finanzas Personales 😉</h1></div>
        <div className={styles.container}>
            {
                state?.register ?
                <div className={styles.formContainer}>
                    <h3>Bienvenido! Registrate</h3>
                    <form className={styles.form}>
                    <input name="firstName" type="text" placeholder="Nombre"/>
                    <input name="lastName" type="text" placeholder="Apellido"/>
                    <input name="Email" type="text" placeholder="Email"/>
                    <input name="Contraseña" type="password" placeholder="Contraseña"/>
                    <div className={styles.buttons}>
                    <input id="recordarme" type="checkbox"/> <label htmlFor="recordarme">Recordarme</label>
                    <Link to="/" state={{register: true}}>Olvidé mi Contraseña</Link>
                    </div>
                    <button className={styles.button}>Registrarme</button>
                    </form>
                </div> 
                    :
                <div className={styles.formContainer}>
                    <h3>Bienvenido! Registrate</h3>
                    <form className={styles.form}>
                        <input name="firstName" type="text" placeholder="Nombre"/>
                        <input name="lastName" type="text" placeholder="Apellido"/>
                        <input name="Email" type="text" placeholder="Email"/>
                        <input name="Contraseña" type="password" placeholder="Contraseña"/>
                        <div className={styles.buttons}>
                        <input id="recordarme" type="checkbox"/> <label htmlFor="recordarme">Recordarme</label>
                        <Link to="/" state={{register: true}}>Olvidé mi Contraseña</Link>
                        </div>
                        <button className={styles.button}>Registrarme</button>
                    </form>
                </div>
            }
            <div className={styles.image}/>
        </div>
    </>
  )
}

