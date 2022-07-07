import React, { useState }  from 'react';
import SavesCreate from './SavesCreate';
import PopUp from './PopUp';
import style from '../Saves.module.css';

export default function SavesForm() {
    const [open, setOpen] = useState<boolean>(false);

return (
    <>
     <button className={style.wrapperNewSave} onClick={() => setOpen(!open)}>Agregar una nueva casilla de ahorro</button>
          <PopUp
            open={open} 
            setOpen={setOpen}
            onClick={() => setOpen(open)}
            title="Completa para agregar una casilla de ahorro!">
            <SavesCreate/>
          </PopUp>
    </>
)
}
