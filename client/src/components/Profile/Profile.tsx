import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import ImageEditor from './utils/ImageEditor'
import { updatePersonalInfo } from '../../redux/reducers/userReducer/userReducer'

interface Profile {
    setImageEditor: () => Boolean
}

export default function Profile() {
    const dispatch = useAppDispatch()
    const {usuario} : any = useAppSelector(({user})=> user)
    const [imageEditor, setImageEditor] = useState(false)
    const [firstNameDisabled, setFirstNameDisabled] = useState(true)
    const [lastNameDisabled, setLastNameDisabled] = useState(true)
    const [passwordDisabled, setPasswordDisabled] = useState(true)
    const [state, setState] = useState({ firstName: "", lastName: "", password: ""})
    const [msg, setMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(()=>{
    setState({firstName: usuario.firstName,lastName: usuario.lastName,password: ""})
    },[usuario])

    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name] : event.target.value})
    }

    function updateFirstName(e: any){
        e.preventDefault()
        dispatch(updatePersonalInfo({key: "firstName", value: state.firstName}))
        .then(() => {
            setFirstNameDisabled(true)
            setMsg("Tu nombre fue actualizado")
            setTimeout(() => {
                setMsg("")
            }, 3000);
        })
        .catch(() => {
            setErrorMsg("No se pudo actualizar")
            setTimeout(() => {
                setErrorMsg("")
            }, 3000);
        })
    }
    function updateLastName(){
        dispatch(updatePersonalInfo({key: "lastName", value: state.lastName}))
        .then(() => {
            setLastNameDisabled(true)
            setMsg("Tu apellido fue actualizado")
            setTimeout(() => {
                setMsg("")
            }, 3000);
        })
        .catch(() => {
            setErrorMsg("No se pudo actualizar")
            setTimeout(() => {
                setErrorMsg("")
            }, 3000);
        })
    }
    
    function updatePassword(){
        dispatch(updatePersonalInfo({key: "password", value: state.password}))
        .then(() => {
            setPasswordDisabled(true)
            setMsg("Tu contraseña fue actualizada")
            setTimeout(() => {
                setMsg("")
            }, 3000);
        })
        .catch(() => {
            setErrorMsg("No se pudo actualizar")
            setTimeout(() => {
                setErrorMsg("")
            }, 3000);
        })
    }

  return (
    <div className={styles.wrapper}>
        <Nav/>
        {
            imageEditor && <ImageEditor setImageEditor={setImageEditor}/>
        }
        <div className={styles.infoWrapper}>
            <img src={usuario.avatar ? usuario.avatar : imagePlaceholder} alt="Profile pic" className={styles.profilePic} onClick={()=> setImageEditor(true)}/>
            <div className={styles.infoContainer}>
                { msg && <h1 className={styles.msg}>{msg}</h1>}
                { errorMsg && <h1 className={styles.msg}>{msg}</h1>}
                <form className={styles.separator} onSubmit={updateFirstName}>
                    <label htmlFor="firstName" style={{width: "250px"}}>Nombre del usuario: </label>
                    <input id='firstName' name='firstName' disabled={firstNameDisabled} type='text' placeholder="Tu nombre" value={state.firstName || ""} onChange={handleChange}/>
                    <button className={styles.edit} type="button" onClick={() => setFirstNameDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                    { !firstNameDisabled && <button className={styles.update} onClick={updateFirstName}><i className='material-icons'>done</i></button>}
                </form>
                <form className={styles.separator} onSubmit={updateLastName}>
                    <label htmlFor="lastName" style={{width: "250px"}}>Apellido del usuario: </label>
                    <input id='lastName' name="lastName" disabled={lastNameDisabled} type='text' placeholder="Tu apellido" value={state.lastName || ""} onChange={handleChange} />
                    <button className={styles.edit} type="button" onClick={() => setLastNameDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                    { !lastNameDisabled && <button className={styles.update} onClick={updateLastName}><i className='material-icons'>done</i></button>}
                </form>
                {!usuario.isGoogle && 
                    <form className={styles.separator} onSubmit={updatePassword}>
                        <label htmlFor="password" style={{width: "250px"}}>Password: </label>
                        <input id='password' name='password' disabled={passwordDisabled} type='password' placeholder='Tu contraseña nueva' value={state.password || ""} onChange={handleChange} />
                        <button className={styles.edit} type="button" onClick={() => setPasswordDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                        { !passwordDisabled && <button className={styles.update} onClick={updatePassword}><i className='material-icons'>done</i></button>}
                    </form>
                }
            </div>
        </div>
    </div>
  )
}