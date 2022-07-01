import React, { useState } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppSelector } from 'redux/hooks'
import imagePlaceholder from "assets/imagePlaceholder.jpg"
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
                <img src={usuario.avatar ? usuario.avatar : imagePlaceholder} alt="Profile pic" className={styles.profilePic} onClick={()=> setImageEditor(true)}/>
                <div className={styles.infoContainer}>
                    <label htmlFor="firstName">Nombre del usuario: </label>
                    <input id='firstName' disabled type='text' placeholder={usuario.userName}/>
                    <label htmlFor="lastName">Apellido del usuario: </label>
                    <input id='lastName' disabled type='text' placeholder={usuario.lastName}></input>
                    <label htmlFor="email">Email: </label>
                    <input id='email' disabled type='text' placeholder={usuario.email}></input>
                    <label htmlFor="password">Password: </label>
                    <input id='password' type='password' disabled placeholder='password'></input>
                </div>
            </div>
        </div>
    </div>
  )
}