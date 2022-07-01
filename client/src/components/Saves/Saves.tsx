import Nav from 'components/Nav/Nav'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks';

export default function Saves() {

  const { usuario, status } = useAppSelector( state => state.user);
  const dispatch = useAppDispatch();

  interface SavingUser{
    name: string,
    start: Date,
    end: Date,
    goal: number,
    place: string,
    currency: string,
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