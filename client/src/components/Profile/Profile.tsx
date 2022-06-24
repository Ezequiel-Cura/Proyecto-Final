import React, { useEffect } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from 'redux/hooks'

export default function Profile() {
    const dispatch = useAppDispatch()
    const usuario:any= useAppSelector(({userReducer})=> userReducer)
    console.log(usuario.id)


  return (
    <div className={styles.profileInfo_wrapper}>
        <div >
            <Nav/>
        </div>
        <div className={styles.text_wrapper}>
            <div>
                <h1>User Details</h1>
                <h6>Aca podras modificar o eliminar tu cuenta</h6>
            </div>
        </div>
        <div className={styles.info_Cointainer}>
            <div className={styles.image_cointainer}>
                <img src={usuario.avatar} alt="Avatar" />
            </div>
            <div className={styles.info_user}>
                <div className={styles.name_wrapper}>
                    <span>Nombre Del usuario:</span>
                    <span>{usuario.nombre + " " + usuario.apellido} </span>
                </div>
                <div>
                    <span>Email:</span>
                    <span>{usuario.email} </span>
                </div>
                <div>
                    <span>Cuentas compartidas</span>
                    <span>PROXIMAMENTE</span>
                </div>
                <div className={styles.button_wrapper}>
                    <button>Eliminar Cuenta</button>
                </div>
            </div>
        </div>
        {/* <div className={styles.profileInfo}>
            <div className={styles.image_cointainer}>
                <img src={infoUsuario.avatar} alt="foto de perfil" />
            </div>
            <div>Nombre: <span>{infoUsuario.nombre}</span></div>
            <div>Apellido: <span>{infoUsuario.apellido} </span></div>
            <div>
                <button>Edit</button>
                <button>Delete Account</button>
            </div>
        </div> */}
    </div>
  )
}
