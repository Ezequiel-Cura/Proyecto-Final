import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import styles from "./Nav.module.css"
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import { logout } from 'redux/reducers/userReducer/actions/logout'

export default function Nav() {
const navigate = useNavigate()
const dispatch = useAppDispatch()
const {usuario}: any = useAppSelector(({user}) => user)
return (
    <nav className={styles.wrapper}>
        <div className={styles.topContainer}>
            <Link to="/profile">
            <img src={usuario.avatar ? usuario.avatar : imagePlaceholder} className={styles.image} referrerPolicy="no-referrer" alt="foto de perfil"/>
            </Link>
            {usuario && <h3 style={{color: "red"}}>{usuario.firstName}</h3>}
        </div>
        <ul className={styles.bottomContainer}>
        <Link to="/"><li>Landing</li></Link>
        <Link to="/home"><li>Home</li></Link>
        <Link to="/home/ingresos"><li>Ingresos</li></Link>
        <Link to="/home/gastos"><li>Gastos</li></Link>
        <Link to="/home/saving"><li>Ahorros</li></Link>
        <Link to="/home/detalles"><li>Detalles</li></Link>
        <Link to="/home/crypto"><li>Finanzas Digitales</li></Link>
        {usuario.role === "admin" &&
        <Link to="/admin/controlPanel"><li>Admin panel</li></Link>
        }
        </ul>
        <button className={styles.logout} onClick={()=> dispatch(logout()).then(()=> {navigate("/", {state: {registered: true}}); window.location.reload()})}>
            Salir
        </button>
    </nav>
  )
}
