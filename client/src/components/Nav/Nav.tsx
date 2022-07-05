import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import styles from "./Nav.module.css"
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import { logout } from 'redux/modules/logout'


export default function Nav() {
const navigate = useNavigate()
const dispatch = useAppDispatch()
const {usuario} = useAppSelector(({user}) => user)
  return (
    <div className={styles.Nav_wrapper}>
        <div className={styles.image_wrapper}>
            <Link to="/profile">
                <img src={usuario.avatar ? usuario.avatar : imagePlaceholder} className={styles.image_container}alt="foto de perfil"/>
                {usuario ? <span>{usuario.firstName} </span> : null}
            </Link>
        </div>
        <div className={styles.items_wrapper}>
            <Link to="/home">
                <div className={styles.Nav_items_wrapper}>
                    <h4>Home</h4>
                </div>
            </Link>
            <Link to="/home/ingresos">
                <div>
                    <h4>Ingresos</h4>
                </div>
            </Link>
            <Link to="/home/gastos">    
                <div>
                    <h4>Gastos</h4>
                </div>
            </Link>
            <Link to="/home/saving">
                <div>
                    <h4>Ahorros</h4>
                </div>
            </Link>
            <Link to="/home/detalles">
                <div>
                    <h4>Detalles</h4>
                </div>
            </Link>
            {usuario.role === "admin" &&
            <Link to="/admin/controlPanel">
                <div>   
                    <h4>Panel de Control</h4>
                </div>
            </Link>
            }
        </div>
            <button className={styles.logout} onClick={()=> dispatch(logout()).then(()=>navigate("/", {state: {registered: true}})).then(()=>window.location.reload())}>
                Salir
            </button>
    </div>
  )
}
