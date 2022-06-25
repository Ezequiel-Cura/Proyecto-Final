import React from 'react';
import { Link } from 'react-router-dom'
import Nav from "../Nav/Nav";
import ConDatos from "./ConDatos";
import SinDatos from './SinDatos';
import styles from "./Ingreso.module.css"

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Ingreso() {
  const { todosLosUsuarios } = useAppSelector( state => state.userReducer); 

  return (
    <div>
      <Nav/>
      {todosLosUsuarios ? <SinDatos/> : <ConDatos/>}  
    </div>
  )
  }