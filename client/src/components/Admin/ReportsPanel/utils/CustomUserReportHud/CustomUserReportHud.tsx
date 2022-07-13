import styles from "./CustomUserReportHud.module.css"
import React, { useEffect, useState } from 'react'
import getUserById from "redux/reducers/adminReducer/Actions/getUserById"
import { useAppDispatch } from "redux/hooks"
import { IUser } from "redux/reducers/adminReducer/adminReducer"
import { useNavigate } from "react-router-dom"
import banUser from "redux/reducers/adminReducer/Actions/banUser"
import closeReview from "redux/reducers/adminReducer/Actions/closeReview"

interface IReport {
    review: string
    report: {
        reportedBy: string
        reason: string
        _id: string
        status: string
    }
    reportedId: string
}
 
export default function CustomUserReportHud({report, reportedId, review}: IReport) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [reportedUser, setReportedUser] = useState<IUser>()
    const [reportedByUser, setReportedByUser] = useState<IUser>()
    const [isEliminated, setIsEliminated] = useState(false)
    const [alertMessage, setAlertMessage] = useState({
        text: "",
        type: "message"
    })

    useEffect(() => {
        dispatch(getUserById(report.reportedBy))
        .then((resp: any) => {
            if (resp.payload === "") return setIsEliminated(true)
            setReportedByUser(resp.payload)
        })
        dispatch(getUserById(reportedId))
        .then((resp: any) => setReportedUser(resp.payload))
    }, [])

    function handleBanReportedUser () {
        dispatch(banUser({id: reportedId, value: true}))
        .then((resp: any) => {
            if(resp.error) {
                setAlertMessage({text: "Hubo un error", type:"error"})
                return setTimeout(() => {
                setAlertMessage({text: "", type:"error"})
                }, 3000)
            }
            setAlertMessage({type: "message", text: "Se ha baneado al usuario que ha sido reportado"})
        })
    }
    function handleBanReportingUser () {
        dispatch(banUser({id: report.reportedBy, value: true}))
        .then((resp: any) => {
            if(resp.error) {
                setAlertMessage({text: "Hubo un error", type:"error"})
                return setTimeout(() => {
                setAlertMessage({text: "", type:"message"})
                }, 3000)
            }
            setAlertMessage({type: "message", text: "Se ha baneado al usuario que hizo el reporte"})
        })
    }
    function handleCloseReview () {
        dispatch(closeReview(report._id))
        .then((resp: any) => {
            if(resp.error) {
                setAlertMessage({text: "Hubo un error", type:"error"})
                return setTimeout(() => {
                setAlertMessage({text: "", type:"message"})
                }, 3000)
            }
            navigate(-1)
        })
    }
    
  return (
    <div className={styles.wrapper}>
        {alertMessage &&
        alertMessage.type !== "error" ?
            <h1 style={{backgroundColor: "lightGreen"}}>{alertMessage.text}</h1>
            :
            <h1 style={{backgroundColor: "red"}}>{alertMessage.text}</h1>
        }
        <h2>Review:</h2>
        <textarea className={styles.textArea} placeholder="este usuario aun no ha dejado una reseña" readOnly defaultValue={review || ""} />
        <h2>Usuario que reporto: {isEliminated ? "Este usuario ha sido eliminado" : reportedByUser?.email}</h2>
        <h2>Usuario reportado: {reportedUser?.email}</h2>
        <h2>razon: {report.reason}</h2>
        <h2>estado de la review: Sin revisar</h2>
        <button onClick={handleBanReportedUser} style={{backgroundColor: "#E8A700", left: "20px", bottom: "10px"}} className={styles.banReportedUser}>
            Banear usuario reportado 
            <span className="material-icons" style={{width: "min-content", fontSize: "2rem",fontWeight: "bolder" , color: "#D15241"}}>block</span>
        </button>
        <button onClick={handleBanReportingUser} style={{backgroundColor: "#E8A700", right: "20px", bottom: "10px"}} className={styles.banReportedUser}>
            Banear usuario que reporto 
            <span className="material-icons" style={{width: "min-content", fontSize: "2rem",fontWeight: "bolder" , color: "#D15241"}}>block</span>
        </button>
        <button onClick={handleCloseReview} className={styles.closeReportButton}>Cerrar report</button>
        <button className={styles.returnButton} onClick={() => navigate(-1)}><span className="material-icons">arrow_back</span> Volver</button>
    </div>
  )
}