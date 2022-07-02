import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving, deleteSaving } from 'redux/reducers/userReducer';

export default function SavesCreate() {

    const dispatch = useAppDispatch();

    interface SavingUser{
        name: string,
        start: string,
        end: string,
        goal?: number,
        place: string,
        currency: string,
        amount: number
      }

    const [input, setInput] = useState<SavingUser>({
        name: '',
        start: '',
        end: '',
        goal: 0,
        place: '',
        currency: '',
        amount: 0
      });

      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
      }
    function createSaving(){
        dispatch(addSaving())
      }
      return(
        <div>
            <h1>HOLIS</h1>
            {/* <button onClick={}>X</button> */}
        </div>
      )
}