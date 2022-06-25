import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import ImageEditor from './utils/ImageEditor'

export default function Profile() {
    const dispatch = useAppDispatch()
    const {usuario} : any = useAppSelector(({user})=> user)
    const [imageEditor, setImageEditor] = useState(false)

  return (
    <div className={styles.wrapper}>
        <Nav/>
        {
            imageEditor ? <ImageEditor setImageEditor={setImageEditor}/> : null
        }
        <div className={styles.profileWrapper}>
            <div className={styles.cuentaWrapper}>
                <h1>Cuenta</h1>
                <h2>modifica o elimina datos</h2>
            </div>
            <div className={styles.infoWrapper}>
                <img src={usuario.image ? usuario.image : imagePlaceholder} alt="Profile pic" className={styles.profilePic} onClick={()=> setImageEditor(true)}/>
                <div className={styles.infoContainer}>
                    <h3>Nombre del usuario: {usuario.userName} {usuario.lastName}</h3>
                    <h3>Email: {usuario.email}</h3>
                    <div>
                    <h3>Cuentas: </h3>
                    <h3>Cuenta 1</h3>
                    </div>
                    <div>
                    <h3>Cuentas compartidas: </h3>
                    <h3>Cuentas compartidas :D</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

{/* <div className={styles.text_wrapper}>
            <div>
                <h1>User Details</h1>
                <h6>Aca podras modificar o eliminar tu cuenta</h6>
            </div>
        </div>
        <div className={styles.info_container}>
            <div className={styles.image_container}>
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
        <div className={styles.profileInfo}>
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