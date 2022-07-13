import React, { useState }  from 'react';
import SavesCreate from './SavesCreate';
import PopUp from './PopUp';
import style from '../Css/Saves.module.css';
import { useAppSelector } from 'redux/hooks';
import PopUpNoPremium from '../NoPremium/PopUpNoPremium';
import BuyPremium from '../NoPremium/BuyPremium';

export default function SavesForm() {
  const { usuario } = useAppSelector(state => state.user);

  const [open, setOpen] = useState<boolean>(false);

return (
    <div>
      {
        usuario.premium === false && usuario.savings.length > 0 
        ? (<div>
            <button className={style.wrapperNewSave} onClick={() => setOpen(!open)}>Agregar una nueva casilla de ahorro<div className={style.addNewSave}>+</div></button>
            <PopUpNoPremium
            open={open} 
            setOpen={setOpen}
            onClick={() => setOpen(open)}
            >
              <BuyPremium
              open={open}
              setOpen={setOpen}
              />
            </PopUpNoPremium>
          </div>)
        : (<div>
            <button className={style.wrapperNewSave} onClick={() => setOpen(!open)}>Agregar una nueva casilla de ahorro<div className={style.addNewSave}>+</div></button>
            <PopUp
            open={open} 
            setOpen={setOpen}
            onClick={() => setOpen(open)}
            >
              <SavesCreate
              open={open}
              setOpen={setOpen}
              />
            </PopUp>
          </div>)
      }
    </div>

)
}
