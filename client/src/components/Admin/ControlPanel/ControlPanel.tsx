import styles from "./ControlPanel.module.css"
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "redux/hooks"
import getAllUsers from "redux/reducers/adminReducer/Actions/getAllUsers"
import Nav from "components/Nav/Nav"
import UserRow from "./utils/UserRow"

export default function ControlPanel() {
const dispatch = useAppDispatch()
const {allUsers} = useAppSelector(({admin}) => admin)
  useEffect(()=>{
    dispatch(getAllUsers())
  },[])

  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.pannelWrapper}>
        <div>
          <h1 style={{fontSize: "3rem", padding: "10px 0px" }}>Panel de control</h1>
        </div>
        <div className={styles.topPannelWrapper}>
          <div style={{display: "grid", gridTemplateRows: "min-content 1fr", paddingTop: "5px"}}>
            <h3>Estadisticas de usuarios registrados semanalmente: </h3>
            <div className={styles.graphContainer}>

            </div>
          </div>
          <div style={{display: "grid", gridTemplateRows: "min-content 1fr"}}>
            <h3>Administradores actuales: </h3>
            <table>
              <tbody>
                {
                 allUsers.map(user => <UserRow
                  key={user._id}
                  id={user._id}
                  email={user.email}
                  nombre={user.firstName}
                  apellido={user.lastName}
                  role={user.role}
                  premium={user.premium}
                  />)
                }
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr className={styles.tr}>
                <th>Nombre</th>
                <th>Email</th>
                <th>Role</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
            {
              allUsers.map(user => <UserRow
                key={user._id}
                id={user._id}
                email={user.email}
                nombre={user.firstName}
                apellido={user.lastName}
                role={user.role}
                premium={user.premium}
                />)
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

