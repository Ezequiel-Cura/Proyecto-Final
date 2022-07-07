import React  from 'react';
import style from '../Saves.module.css';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

export default function PopUp(props : any) {
    const {title, children, open, setOpen } = props;

return (
    <Dialog open={open} maxWidth='md'>
        <DialogTitle>
            {title}
            <Button onClick={()=> setOpen(!open)}>Cerrar</Button>
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
    </Dialog>
)
}
