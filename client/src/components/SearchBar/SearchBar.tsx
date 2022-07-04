import React, { useState } from "react";
import { useAppSelector } from "redux/hooks";

export default function SearchBar(){

   const [input, setInput] = useState("")

   const [filtrado, setFiltrado] = useState([])

   function inputChange(e: any) {
    setInput(e.target.value);
    console.log(input)
  }

  const {Account} = useAppSelector((state) => state.user.usuario)


  
  function handleClick(e: React.SyntheticEvent){
    e.preventDefault()
   setFiltrado (Account.variableExpenses.filter((e: any) => e.description === input))
    console.log(filtrado)
  }

return(
    <div>
     <input 
        style={{width: "90%"}}
        type="text"
        placeholder="Busca gastos por su descripción!.."
        onChange={(e) => inputChange(e)}
      />
      <button
      onClick={(e) => handleClick(e)}
        type="submit"
      >
        Buscar
      </button>
      <div>
      {filtrado.length > 0 ?
      filtrado.map((e: any) => (
        <div>
          <span>{e.date.split("T")[0]}</span>
          <br/>
          <span>{e.category}</span>
          <br/>
          <span>{e.description}</span>
          <br/>
          <span>${e.amount}</span>
        </div>
      ))
    : <span>holitas</span>
    }
      </div>
    </div>
)
}

// date: '2022-07-01T02:06:49.608Z', category: 'Salud', description: 'ayuda me dio la gripe del mono', amount: 2000