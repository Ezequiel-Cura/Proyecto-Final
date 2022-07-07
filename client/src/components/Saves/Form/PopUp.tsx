import React  from 'react';
import style from '../PopUpForm.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';


export default function PopUp(props : any) {
    const {title, children, open, setOpen } = props;

    const stylesMui = {
        paper: {
            padding : '20px 20px 20px 20px',
            color: "red"
    }
    }

return (
    <Dialog open={open} maxWidth='md'>
        <DialogTitle>
            {title}
            <button onClick={()=> setOpen(!open)}>X</button>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
)
}
