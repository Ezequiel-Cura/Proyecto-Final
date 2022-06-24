// import styles from "./Home.module.css"
import React, { useEffect } from 'react'
import Nav from "components/Nav/Nav"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"
import { loadMockUser } from "redux/reducers/userReducer"

export default function Home() {
  const {usuario}:any = useAppSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadMockUser())
  }, [dispatch])

  console.log(usuario)
  return (
    <div>
      <Nav/>
      <div>HOME</div>
    </div>
  )
}
