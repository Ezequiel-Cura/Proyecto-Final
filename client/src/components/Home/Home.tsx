// import styles from "./Home.module.css"
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
    <div>
      <Nav/>
      <div>
        <h1>Administra tus finanzas</h1>

      </div>
      <div>
        <Link to="/home/ingresos">
          <h2>INGRESOS</h2> 
        </Link>

        <Link to="/gastos">
          <h2>GASTOS</h2>
        </Link>

        <Link to="/ahorros">
          <h2>AHORROS</h2>
        </Link>

        <h2>NOVEDADES</h2>
      </div>
    </div>
  )
}
