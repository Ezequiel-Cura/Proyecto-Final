import React, { useState } from "react";
import { useAppSelector } from "redux/hooks";

export default function SearchBar(){

   const [input, setInput] = useState("")

   function inputChange(e: any) {
    setInput(e.target.value);
    console.log(input)
  }

  function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
  }

return(
    <div>
     <input
        type="text"
        placeholder="Busca por la descripción!.."
        onChange={(e) => inputChange(e)}
      />
      <button
        type="submit"
      >
        Buscar
      </button>
    </div>
)
}