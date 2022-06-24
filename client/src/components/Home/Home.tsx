import styles from "./Home.module.css"
import React, { useEffect } from 'react'
import Nav from "components/Nav/Nav"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"
import { loadMockUser } from "redux/reducers/userReducer"
import { Link } from 'react-router-dom'

export default function Home() {
  const {usuario}:any = useAppSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMockUser())
  }, [dispatch])

  console.log(usuario)
  return (
    <div>
      <Nav/>
      <div>
        <h1>Administra tus finanzas</h1>

      </div>
      <div className={styles.links_wrapper}>
        <div className={styles.ingreso_link}>
          <Link to="/home/ingresos">
            <h2>INGRESOS</h2> 
          </Link>
        </div>

        <div className={styles.gastos_link}>
          <Link to="/gastos">
            <h2>GASTOS</h2>
          </Link>
        </div>

        <div className={styles.ahorros_link}>
          <Link to="/ahorros">
            <h2>AHORROS</h2>
          </Link>
        </div>
        
        <div className={styles.detalles_link}>
          <Link to="/detalles">
            <h2>Detalles</h2>            
          </Link>
        </div>

      </div>
    </div>
  )
}
