import React, { useState } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppSelector } from 'redux/hooks'
import imagePlaceholderWide from "assets/imagePlaceholderWide.jpg"
import ImageEditor from './utils/ImageEditor'

interface Profile {
    setImageEditor: () => Boolean
}

export default function Profile() {
    const {usuario} : any = useAppSelector(({user})=> user)
    const [imageEditor, setImageEditor] = useState(false)

  return (
    <div className={styles.wrapper}>
        <Nav/>
        {
            imageEditor && <ImageEditor setImageEditor={setImageEditor}/>
        }
        <div className={styles.profileWrapper}>
            <div className={styles.cuentaWrapper}>
                <h1>Cuenta</h1>
                <h2>modifica o elimina datos</h2>
            </div>
            <div className={styles.infoWrapper}>
                <img src={usuario.avatar ? usuario.avatar : imagePlaceholderWide} alt="Profile pic" className={styles.profilePic} onClick={()=> setImageEditor(true)}/>
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