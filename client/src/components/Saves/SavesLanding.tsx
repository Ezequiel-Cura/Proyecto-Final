import Nav from 'components/Nav/Nav';
import React from 'react';
import { Link } from "react-router-dom";

export default function SavesLanding() {
    return (
      <div>
        <Nav/>
        <div>
          <h1>No tienes un monto de ahorro todavía</h1>
          <div>
            <p>Añadí tus gastos e ingresos para obtener un detalle ahora</p>
            <Link to="/home/saving">
              <button>+</button>
            </Link>
          </div>
        </div>
      </div>
    )
  } 
  