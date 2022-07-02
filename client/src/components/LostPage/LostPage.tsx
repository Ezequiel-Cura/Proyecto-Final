import styles from "./LostPage.module.css"
import React from 'react'
import { useNavigate } from "react-router-dom"

export default function LostPage() {
    const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
        <button className={styles.btn} onClick={()=> navigate("/home")}><h1>Are you lost?</h1></button>
    </div>
  )
}

