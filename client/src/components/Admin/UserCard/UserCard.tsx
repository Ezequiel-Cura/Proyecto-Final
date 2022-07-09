import styles from "./UserCard.module.css"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"  
import { useAppDispatch, useAppSelector } from "redux/hooks"
import getUserById from "redux/reducers/adminReducer/Actions/getUserById"
import Nav from "components/Nav/Nav"
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import { Rating } from "@mui/material"
import sendEmail from "redux/reducers/adminReducer/Actions/sendEmail"
import deleteUserReview from "redux/reducers/adminReducer/Actions/deleteUserReview"

export default function UserCard() {
    const dispatch = useAppDispatch()
    const {userCard} = useAppSelector(({admin}) => admin)
    const {state}: any = useLocation()
    const [emailMsg, setEmailMsg] = useState("")
    const [emailVerificationMsg, setEmailVerificationMsg] = useState("")
    const [emailFailMsg, setEmailFailMsg] = useState("")

    useEffect(()=>{
        dispatch(getUserById(state.id))
    },[])

    function handleEmailMessageChange (event: ChangeEvent<HTMLTextAreaElement>) {
      setEmailMsg(event.target.value)
    }
    function handleSubmit (event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      if (emailMsg.length) {
        dispatch(sendEmail({emailMsg, email: userCard.email}))
        .then((resp: any) => {
          if (resp.error) {
            setEmailFailMsg(resp.error.message)
            setTimeout(() => {
            setEmailFailMsg("")
            }, 2000);
            return
          }
          setEmailVerificationMsg("Se ha enviado tu mensaje")
          setEmailMsg("")
          setTimeout(() => {
            setEmailVerificationMsg("")
          }, 2000);
        })
      }
    }

    function handleDeleteReview () {
      dispatch(deleteUserReview(userCard._id))
    }
  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.userCardWrapper}>
       <div className={styles.topContainer}>
      <h1 className={styles.ficha}>Ficha de usuario</h1>
       </div>
       <div className={styles.bottomContainer}>
        <div className={styles.userPresentation}>
          <img src={userCard?.avatar || imagePlaceholder} referrerPolicy="no-referrer" className={styles.img}/>
          <h1>{userCard.firstName} {userCard.lastName}</h1>
        </div>
        <div className={styles.ulContainer}>
          <ul>
            <li>Fecha de creacion del usuario: <span style={{color: "white"}}>aun no</span></li>
            <li>Correo: <span style={{color: "white"}}>{userCard.email}</span></li>
            <li>Tipo de usuario: <span style={{color: "white"}}>{userCard.role}</span></li>
            <li>Categoria: <span style={{color: "white"}}>{userCard.premium ? "Premium" : "No premium"}</span></li>
          </ul>
        </div>
        <div className={styles.formsContainer}>
          <div className={styles.leftFormContainer}>
              <ul>
                <li style={{ marginLeft: "50px", color: "black", fontWeight: "bold", marginBottom: "5px"}}>Review publicada:</li>
              </ul>
              <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
              <textarea className={styles.textArea} placeholder="este usuario aun no ha dejado una reseña" value={userCard?.review?.text || ""} readOnly/>
              <button onClick={handleDeleteReview} className={styles.deleteReviewButton}>Borrar Review<span className="material-icons" style={{width: "min-content"}}>delete_forever</span></button>
              </div>
              <div className={styles.rating}>
              <span>Calificacion:</span>
              <Rating value={userCard?.review?.rating || 0} readOnly/>
              </div>
          </div>
          <div className={styles.rightFormContainer}>
            <ul style={{display: "flex", flexDirection: "column"}}>
              <li style={{marginBottom: "5px",marginLeft: "50px", color: "black", fontWeight: "bold"}}>Enviar un correo:</li>
              {emailFailMsg &&
                <li style={{alignSelf:"center", width: "max-content", listStyleType: "none", backgroundColor: "red", color: "white"}}>{emailFailMsg}</li>
              }
               {emailVerificationMsg &&
                <li style={{alignSelf:"center", width: "max-content", listStyleType: "none", backgroundColor: "#20B2AA", color: "white"}}>{emailVerificationMsg}</li>
              }
            </ul>
            <form onSubmit={handleSubmit} style={{height: "100%", display: "flex", flexDirection: "column"}}>
              <textarea className={styles.textArea} placeholder="Coloque aqui el mensaje que le quiere enviar a este usuario por email" 
              style={{cursor: "auto"}} onChange={handleEmailMessageChange} value={emailMsg || ""}/>
              <button className={styles.sendEmailButton} style={{alignSelf: "center"}}>Enviar <span className="material-icons">forward_to_inbox</span></button>
            </form>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button>Sancionar cuenta</button>
          <button>Eliminar cuenta<span className="material-icons" style={{width: "min-content"}}>delete_forever</span></button>
        </div>
       </div>
      </div>
    </div>
  )
}
