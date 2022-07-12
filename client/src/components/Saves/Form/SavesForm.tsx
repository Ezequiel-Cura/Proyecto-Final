import React, { useState }  from 'react';
import SavesCreate from './SavesCreate';
import PopUp from './PopUp';
import style from '../Css/Saves.module.css';

export default function SavesForm() {
    const [open, setOpen] = useState<boolean>(false);

return (
    <div>
     <button className={style.wrapperNewSave} onClick={() => setOpen(!open)}>Agregar una nueva casilla de ahorro<div className={style.addNewSave}>+</div></button>
      <PopUp
        open={open} 
        setOpen={setOpen}
        onClick={() => setOpen(open)}
        >
        <SavesCreate
        open={open}
        setOpen={setOpen}
        />
      </PopUp>
    </div>
)
}
