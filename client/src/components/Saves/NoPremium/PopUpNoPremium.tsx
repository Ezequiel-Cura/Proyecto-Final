import React  from 'react';
import style from '../Css/PopUpForm.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';


export default function PopUpNoPremium(props : any) {
    const { children, open, setOpen } = props;
    
return (
    <Dialog open={open} maxWidth='md'>
        <DialogTitle>
            <div className={style.divCloseButton}>
                <button className={style.closeButton} onClick={()=> setOpen(!open)}>X</button>
            </div>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
)
}
