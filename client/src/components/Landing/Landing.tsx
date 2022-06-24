import styles from "./Landing.module.css"
import { useLocation } from "react-router-dom";
import React from 'react';
import Login from "./Login";
import Register from "./Register";


export default function Landing() {
  const {state} : any = useLocation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1 className={styles.textWelcome}>Bienvenidos a Finanzas Personales 😉</h1>
      </div>
      <div className={styles.container}>
          {
            state.registered ? <Login/> : <Register/>
          }
          <div className={styles.image}/>
      </div>
      <div className={styles.background}/>
    </div>
  )
}