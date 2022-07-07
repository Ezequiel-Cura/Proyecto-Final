import styles from "./index.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Login from "./utils/Login";
import Register from "./utils/Register";


export default function Landing() {
  const {state} : any = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("logged")) navigate("/home")
  },[])
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <h1 className={styles.textWelcome}>Bienvenidos a Finanzas Personales !</h1>
      </div>
      <div className={styles.container}>
          {
            state?.registered ? <Login/> : <Register/>
          }
          <div className={styles.image}/>
      </div>
      <div className={styles.background}/>
    </div>
  )
}