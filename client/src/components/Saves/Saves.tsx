import Nav from 'components/Nav/Nav'
// import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addSaving } from 'redux/modules/addSaving';
import { deleteSaving } from 'redux/modules/deleteSaving';
// import { addSaving, deleteSaving } from 'redux/reducers/userReducer';


export default function Saves() {

  const { usuario } = useAppSelector( state => state.user);
  const dispatch = useAppDispatch();

  interface SavingUser{
    name: string,
    start: Date,
    end: Date,
    goal: number,
    place: string,
    currency: string,
  }
  function createSaving(){
    dispatch(addSaving())
  }
  function handleDelete(){
    dispatch(deleteSaving())
  }
  return (
    <div>
      <Nav />
      {
        usuario.Saving.length > 0
        ? usuario.Saving.map( (s: SavingUser) => (
          <div>
            <h1>{s.name}</h1>
            </div>
        ))
        : <h1>Todavia no creaste un ahorro</h1>
      }
    </div>
  )
}