import React, { useState }  from 'react';
import SavesCreate from './SavesCreate';
import PopUp from './PopUp';
import style from '../Saves.module.css';
import { Style } from '@mui/icons-material';

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
        <SavesCreate/>
      </PopUp>
    </div>
)
}
