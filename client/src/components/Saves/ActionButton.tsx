import React  from 'react';
import { Button } from '@mui/material';

export default function ActionButton(props : any) {

    const { color, children, onClick } = props;

return (
    <Button onClick={onClick}>
        {children}
    </Button>
)
}