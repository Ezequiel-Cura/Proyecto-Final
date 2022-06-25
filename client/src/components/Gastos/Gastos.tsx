import Nav from 'components/Nav/Nav';
import React from 'react';
import ConDatosGastos from "./ConDatosGastos";
import SinDatosGastos from "./SinDatosGastos";

import { useAppSelector } from "../../redux/hooks";

export default function Gastos() {
  const { todosLosUsuarios } = useAppSelector( state => state.userReducer); 

  return (
    <div>
        <Nav/>
        {todosLosUsuarios ? <SinDatosGastos/> : <ConDatosGastos/>}  
    </div>
  )
}
