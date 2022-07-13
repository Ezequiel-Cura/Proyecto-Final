import styles from "./UnVerified.module.css"
import React from 'react'
import { Link } from "react-router-dom"

export default function UnVerified() {
  return (
    <div className={styles.wrapper}>
      <h1 style={{width: "50%"}}>Aun no has verificado tu email, checkea tu cuenta de email y vuelve cuando te hayas verificado</h1>
      <Link to="/" className={styles.link}>Vuelve al inicio</Link>
    </div>
  )
}
