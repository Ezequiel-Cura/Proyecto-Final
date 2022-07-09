import React  from 'react';
import style from '../PopUpForm.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';


export default function PopUp(props : any) {
    const { children, open, setOpen } = props;
    
return (
    <Dialog open={open} maxWidth='md'>
        <DialogTitle>
            <button className={style.closeButton} onClick={()=> setOpen(!open)}>X</button>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
)
}
