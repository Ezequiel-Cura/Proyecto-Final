import styles from "./Landing.module.css"
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import landingMan from "assets/landingMan.png"
import Review from "./utils/Review"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import getAllReviews from "redux/reducers/commonReducer/Actions/getAllReviews"
import { logout } from "redux/reducers/userReducer/actions/logout"
import reportReview from "redux/reducers/userReducer/actions/reportReview"

export default function Landing() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {allReviews} = useAppSelector(({common}) => common)
  const [viewingReview, setViewingReview]= useState(allReviews[0])
  const [menuPreview, setMenuPreview] = useState(false)
  const [index, setIndex] = useState(0)
  const [reported, setReported] = useState("")
  const [reportMessage, setReportMessage] = useState("")
  const [errorReportMessage,setErrorReportMessage] = useState("")
  const menuRef = useRef() as MutableRefObject<null>
  useEffect(()=> {
    dispatch(getAllReviews())
  },[])
  
  useEffect(()=> {
    if(allReviews.length) {
      let newIndex = Math.floor(Math.random() * allReviews.length)
      setViewingReview(allReviews[newIndex])
      setIndex(newIndex)
    }
    },[allReviews])
  useEffect(() => {
    setViewingReview(allReviews[index])
  },[index])

  const handleLeftArrow = () => {
    setIndex(prev => prev === 0 ? allReviews.length - 1 : prev - 1)
  }

  const handleRightArrow = () => {
    setIndex(prev => prev === allReviews.length - 1 ? 0 : prev + 1)
  }

  function handleReportChange (e: any) {
    setErrorReportMessage("")
    setReportMessage(e.target.value)
  }

  function handleReport (e: any) {
    e.preventDefault()
    if(!reportMessage) return setErrorReportMessage("No puedes enviar un report vacio")
    dispatch(reportReview({reason: reportMessage, id: viewingReview._id}))
    .then((resp: any) => {
      if (resp.error) return
      setMenuPreview(false)
      setReportMessage("")
      setReported("Has reportado a este usuario")
      setTimeout(() => {
        setReported("")
      }, 3000);
    })
  }

  return (
    <div className={styles.wrapper}>
          {menuPreview &&
          <div className={styles.parentDiv}>
            <form ref={menuRef} className={styles.form} onSubmit={handleReport}>
              <h3 style={{textAlign: "center",color: "red", fontWeight: "900"}}>Tenga en cuenta que los administradores podran ver quien envio el reporte</h3>
              <textarea maxLength={200} className={styles.reportInput} placeholder="Coloque aqui la razon del reporte" value={reportMessage || ""} onChange={handleReportChange}/>
              <div style={{display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr 1fr", justifyContent: "center", alignItems: "center", justifyItems: "center"}}>
              <h3 style={{textAlign: "center",color: "red", fontWeight: "900"}}>{errorReportMessage}</h3>
              <button className={styles.sendReportButton}>Envia tu reporte</button>
              </div>
              <button type="button" className={styles.quitMenuButton} onClick={()=> setMenuPreview(false)}><span className="material-icons">close</span></button>
            </form>
          </div>
          }
      <nav className={styles.nav}>
        <h2 style={{color: "#3DB39E"}}>Finanzas Personales</h2>
        <div className={styles.registerButtonContainer}>
          {
            localStorage.getItem("logged") ?
            <>
            <button className={styles.registerButton} style={{backgroundColor: "red"}}  onClick={() => dispatch(logout())}>Salir</button>
            <button className={styles.registerButton} style={{width: "max-content"}} onClick={() => navigate("/home")}>
            Vuelve al home
            </button>
            </>
            :
            <>
            <button className={styles.registerButton} onClick={() => navigate("/login")}>
            Registrate
            </button>
            <button className={styles.registerButton} onClick={() => navigate("/login", {state : {registered: true}})}>
            Ingresa
            </button>
            </>
          }
          
        </div>
      </nav>
      <div className={styles.firstContainer}>
        <div className={styles.firstContainerLeftDiv}>
          <h1 style={{fontSize:"4rem", width:"100%"}}> Gestion de <p style={{fontWeight: "600"}}>gastos</p> en linea</h1>
          <h3>Administra tus finanzas personales de una manera mas facil</h3>
          <button className={styles.registerButton} style={{width: "50%", alignSelf: "start", marginTop: "40px"}}>Comienza ahora</button>
        </div>
        <img src={landingMan} alt="landing man" className={styles.landingMan}/>
      </div>
      <div className={styles.secondContainer}>
        <div className={styles.secondContainerLeftDiv}>
          <h2>Reseñas de los usuarios</h2>
          <h4>Nos interesan las opiniones de nuestros usuarios y queremos compartirlas</h4>
        </div>
        <div className={styles.secondContainerRightDiv}>
          <div className={styles.buttonContainer}>
            <i className="material-icons" onClick={handleLeftArrow}
            style={{width: "100%", fontSize: "60px", display: "flex", justifyContent: "center", cursor: "pointer"}}>
            arrow_back_ios_new
            </i>
          </div>
            <Review reported={reported} user={viewingReview} setMenuPreview={setMenuPreview}/>
          <div className={styles.buttonContainer}>
            <i className="material-icons" onClick={handleRightArrow}
            style={{width: "100%", fontSize: "60px", display: "flex", justifyContent: "center" , cursor: "pointer"}}>
            arrow_forward_ios
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}

