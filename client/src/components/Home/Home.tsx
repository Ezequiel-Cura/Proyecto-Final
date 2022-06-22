import styles from "./Home.module.css"
import React from 'react'
import Nav from "components/Nav/Nav"


export default function Home() {
  return (
    <div>
      <Nav/>
      <div className={styles.wrapper}>
        <h1>HOME</h1>
      </div>
    </div>
  )
}
