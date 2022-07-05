import React, { useEffect } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Novedades.module.css"


export default function Novedades() {

    useEffect(()=>{

    },[])

  return (
    <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
        <Nav/>
        <h1 className={styles.nove_h1}>Ultimas noticias</h1>
        <div>

        </div>
    </div>
  )
}
