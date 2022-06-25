
import styles from "./Home.module.css"

import React, { useEffect } from 'react'
import Nav from "components/Nav/Nav"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"
import { Link } from 'react-router-dom'

export default function Home() {
  const {usuario}:any = useAppSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    
  }, [dispatch])

  return (
    <div >
      <Nav/>
      <div>
        <h1>Administra tus finanzas</h1>

      </div>
      <div className={styles.links_wrapper}>

        <div>
            <Link to="/home/ingresos">
              <div className={styles.ingresoLink}>
                  <h2>INGRESOS</h2> 
              </div>
            </Link>
        </div>

        <div>
          <Link to="/home/gastos">
            <div className={styles.gastos_link}>
                <h2>GASTOS</h2>
            </div>
          </Link>
        </div>

        <div>

          <Link to="/home">
            <div className={styles.ahorros_link}>
                <h2>AHORROS</h2>
            </div>
          </Link>
        </div>

        <div>
            <Link to="/home/detalles">
              <div className={styles.detalles_link}>
                  <h2>DETALLES</h2>            
              </div>
            </Link>
        </div>

      </div>
    </div>
  )
}
