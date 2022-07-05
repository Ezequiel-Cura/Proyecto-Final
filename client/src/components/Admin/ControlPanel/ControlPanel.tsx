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
      <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
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
  )
}

