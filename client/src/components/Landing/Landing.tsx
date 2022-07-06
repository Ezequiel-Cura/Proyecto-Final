import styles from "./Landing.module.css"
import React from 'react'
import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <div className={styles.registerButtonContainer}>
        <button className={styles.registerButton} onClick={() => navigate("/login")}>
          Aun no tienes cuenta? Registrate
        </button>
        <button className={styles.registerButton} onClick={() => navigate("/login", {state : {registered: true}})}>
          Ya no tienes cuenta? Inicia sesion
        </button>
      </div>
    </div>
  )
}

