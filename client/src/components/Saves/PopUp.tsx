import React  from 'react';
// import style from './Saves.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ActionButton from './ActionButton';

export default function PopUp(props : any) {

    const {title, children, open, setOpen } = props;

return (
    <Dialog open={open} maxWidth='md'>
        <DialogTitle>
            {title}
            <ActionButton onClick={()=> {setOpen(false)}}>Cerrar</ActionButton>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
)
}