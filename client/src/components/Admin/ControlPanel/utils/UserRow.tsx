import styles from "./UserRow.module.css"
import React, { useEffect, useState } from 'react'
import RoleContextMenu from "./RoleContextMenu/RoleContextMenu"
import PremiumContextMenu from "./PremiumContextMenu/PremiumContextMenu"

interface UserRow {
id: string,
email: string,
nombre: string,
apellido: string,
role: string,
premium: boolean,
}

export default function UserRow({id, email, nombre, apellido, role, premium}: UserRow) {
  const [roleView, setRoleView] = useState(false)
  const [premiumView, setPremiumView] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  return (
    <tr style={{textAlign: "center"}}>
    <td>{nombre} {apellido === undefined ? null : apellido}</td>
    <td>{email}</td>
    <td
      onContextMenu={e => {
        e.preventDefault()
        setPosition({x: e.pageX, y:e.pageY})
        setRoleView(true)
        setPremiumView(false)
      }}
      >{role}</td>
    <td
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

