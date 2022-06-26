import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import styles from "./Nav.module.css"
import imagePlaceholder from "assets/imagePlaceholder.jpg"


export default function Nav() {
const {usuario} = useAppSelector(({user}) => user)
  return (
    <div className={styles.Nav_wrapper}>
        <div className={styles.image_wrapper}>
            <Link to="/profile">
                <img src={usuario.avatar ? usuario.avatar : imagePlaceholder} className={styles.image_container}alt="foto de perfil"/>
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
            <Link to="/home/detalles">
                <div>
                    <h4>Detalles</h4>
                </div>
            </Link>
        </div>
    </div>
  )
}
