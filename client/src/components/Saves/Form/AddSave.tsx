import React, { useState }  from 'react';
import AddSaveForm from './AddSaveForm';
import PopUp from './PopUp';
import style from '../Css/SavesDetail.module.css';

export default function AddSave(props : any) {
  const { name } = props;
  const [open, setOpen] = useState<boolean>(false);
return (
    <div>
     <button className={style.buttonAddSave} onClick={() => setOpen(!open)}>Agrega un nuevo monto<div className={style.addNewSave}>+</div></button>
      <PopUp
        open={open} 
        setOpen={setOpen}
        onClick={() => setOpen(open)}
        >
        <AddSaveForm
        open={open}
        setOpen={setOpen}
        name={name}
        />
      </PopUp>
    </div>
)
}