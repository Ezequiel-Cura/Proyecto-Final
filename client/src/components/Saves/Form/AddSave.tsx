import React, { useState }  from 'react';
import AddSaveForm from './AddSaveForm';
import PopUp from './PopUp';

export default function AddSave() {
    const [open, setOpen] = useState<boolean>(false);
return (
    <div>
     <button onClick={() => setOpen(!open)}>Agrega un nuevo monto<div>+</div></button>
      <PopUp
        open={open} 
        setOpen={setOpen}
        onClick={() => setOpen(open)}
        >
        <AddSaveForm
        open={open}
        setOpen={setOpen}
        />
      </PopUp>
    </div>
)
}