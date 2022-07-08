import styles from "./Landing.module.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import landingMan from "assets/landingMan.png"
import Review from "./utils/Review"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import getAllReviews from "redux/reducers/commonReducer/Actions/getAllReviews"

export default function Landing() {
  const navigate = useNavigate()
  const {allReviews} = useAppSelector(({common}) => common)
  const [viewingReview, setViewingReview]= useState({})
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState(0)
  useEffect(()=> {
    dispatch(getAllReviews())
  },[])
  
  useEffect(()=> {
    if(allReviews.length) {
      let newIndex = Math.floor(Math.random() * allReviews.length)
      console.log("newIndex: ",newIndex)
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

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <h2 style={{paddingLeft: "10px"}}>$APP.gastos</h2>
        <div className={styles.registerButtonContainer}>
          <button className={styles.registerButton} onClick={() => navigate("/login")}>
            Registrate
          </button>
          <button className={styles.registerButton} onClick={() => navigate("/login", {state : {registered: true}})}>
            Ingresa
          </button>
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
            <Review user={viewingReview}/>
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

