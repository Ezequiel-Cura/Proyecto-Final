import styles from "./PremiumContextMenu.module.css"
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useAppDispatch } from "redux/hooks"
import changePremium from "redux/reducers/adminReducer/Actions/changePremium"
import getAllUsers from "redux/reducers/adminReducer/Actions/getAllUsers"

interface PremiumContextMenu {
    nombre: string,
    id: string,
    x: number,
    y: number,
    setPremiumView: Dispatch<SetStateAction<boolean>>
  }

export default function PremiumContextMenu({nombre, id, x, y, setPremiumView}: PremiumContextMenu) {
const dispatch = useAppDispatch()
const divRef = useRef() as any
const ulRef = useRef() as any
const textRef = useRef() as any
  useEffect(()=>{
    const handlePremiumView = (e: any) => {
      if (e.path[0] !== divRef.current && e.path[0] !== ulRef.current && e.path[0] !== textRef.current) setPremiumView(false)
    }
    window.addEventListener("click", handlePremiumView)
    window.addEventListener("oncontextmenu", handlePremiumView)
    return () =>{
      window.removeEventListener("click", handlePremiumView)
      window.addEventListener("oncontextmenu", handlePremiumView)
    }
  },[])

  function changeUserPremium (value: string) {
    dispatch(changePremium({value, id}))
    .then(() => dispatch(getAllUsers()))
  }

  return (
    <div ref={divRef} className={styles.wrapper} style={{top: y, left: x}}>
      <ul ref={ulRef}>
        <h3 ref={textRef} style={{cursor: "default"}}>Premium {nombre}</h3>
        <li onClick={()=> changeUserPremium("true")}>Si</li>
        <li onClick={()=> changeUserPremium("false")}>No</li>
      </ul>
    </div>
  )
}

