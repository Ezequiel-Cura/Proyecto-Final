import styles from "./UserRow.module.css"
import React, { useEffect, useState } from 'react'
import RoleContextMenu from "./RoleContextMenu/RoleContextMenu"
import PremiumContextMenu from "./PremiumContextMenu/PremiumContextMenu"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "redux/hooks"
import { cleanUserCard } from "redux/reducers/adminReducer/adminReducer"

interface UserRow {
id: string,
email: string,
nombre: string,
apellido: string,
role: string,
premium: boolean,
}

export default function UserRow({id, email, nombre, apellido, role, premium}: UserRow) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [roleView, setRoleView] = useState(false)
  const [premiumView, setPremiumView] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  function handleNavigation () {
    dispatch(cleanUserCard())
    navigate("/admin/userCard", {state: {id}})
  }

  return (
    <tr className={styles.tr}>
    <td onMouseDown={handleNavigation} style={{cursor: "pointer"}}>{nombre} {apellido === undefined ? null : apellido}</td>
    <td>{email}</td>
    <td className={styles.clickable}
      onContextMenu={e => {
        e.preventDefault()
        setPosition({x: e.pageX, y:e.pageY})
        setRoleView(true)
        setPremiumView(false)
      }}
      >{role}</td>
    <td className={styles.clickable}
      onContextMenu={e => {
        e.preventDefault()
        setPosition({x: e.pageX, y:e.pageY})
        setRoleView(false)
        setPremiumView(true)
      }}
    >{premium ? "si" : "no"}</td>
    <td>
    { roleView && <RoleContextMenu nombre={nombre} id={id} x={position.x} y={position.y} setRoleView={setRoleView}/>}
    { premiumView && <PremiumContextMenu nombre={nombre} id={id} x={position.x} y={position.y} setPremiumView={setPremiumView}/>}
    </td>
    </tr>
  )
}

