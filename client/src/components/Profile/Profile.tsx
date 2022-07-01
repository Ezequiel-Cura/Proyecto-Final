import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import ImageEditor from './utils/ImageEditor'
import { updatePersonalInfo } from 'redux/reducers/userReducer'

interface Profile {
    setImageEditor: () => Boolean
}

export default function Profile() {
    const dispatch = useAppDispatch()
    const {usuario} : any = useAppSelector(({user})=> user)
    const [imageEditor, setImageEditor] = useState(false)
    const [firstNameDisabled, setFirstNameDisabled] = useState(true)
    const [lastNameDisabled, setLastNameDisabled] = useState(true)
    const [emailDisabled, setEmailDisabled] = useState(true)
    const [passwordDisabled, setPasswordDisabled] = useState(true)
    const [state, setState] = useState({ firstName: "", lastName: "", email: "", password: ""})
    const [msg, setMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(()=>{
    setState({
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        email: usuario.email,
        password: ""
    })
    },[usuario])

    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name] : event.target.value})
    }

    function updateFirstName(){
        dispatch(updatePersonalInfo({key: "firstName", value: state.firstName}))
        .then(() => {
            setFirstNameDisabled(true)
            setMsg("firstName updated Successfully")
            setTimeout(() => {
                setMsg("")
            }, 4000);
        })
        .catch(() => {
            setErrorMsg("Couldn't update firstName")
            setTimeout(() => {
                setErrorMsg("")
            }, 4000);
        })
    }
    function updateLastName(){
        dispatch(updatePersonalInfo({key: "lastName", value: state.lastName}))
        .then(() => {
            setLastNameDisabled(true)
            setMsg("lastName updated Successfully")
            setTimeout(() => {
                setMsg("")
            }, 4000);
        })
        .catch(() => {
            setErrorMsg("Couldn't update lastName")
            setTimeout(() => {
                setErrorMsg("")
            }, 4000);
        })
    }
    function updateEmail(){
        dispatch(updatePersonalInfo({key: "email", value: state.email}))
        .then(() => {
            setEmailDisabled(true)
            setMsg("email updated Successfully")
            setTimeout(() => {
                setMsg("")
            }, 4000);
        })
        .catch(() => {
            setErrorMsg("Couldn't update email")
            setTimeout(() => {
                setErrorMsg("")
            }, 4000);
        })
    }
    function updatePassword(){
        dispatch(updatePersonalInfo({key: "password", value: state.password}))
        .then(() => {
            setPasswordDisabled(true)
            setMsg("password updated Successfully")
            setTimeout(() => {
                setMsg("")
            }, 4000);
        })
        .catch(() => {
            setErrorMsg("Couldn't update password")
            setTimeout(() => {
                setErrorMsg("")
            }, 4000);
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
                <div className={styles.separator}>
                <label htmlFor="firstName" style={{width: "250px"}}>Nombre del usuario: </label>
                <input id='firstName' name='firstName' disabled={firstNameDisabled} type='text' placeholder="Tu nombre" value={state.firstName || ""} onChange={handleChange}/>
                <button className={styles.edit} onClick={() => setFirstNameDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                { !firstNameDisabled && <button className={styles.update} onClick={updateFirstName}><i className='material-icons'>done</i></button>}
                </div>
                <div className={styles.separator}>
                <label htmlFor="lastName" style={{width: "250px"}}>Apellido del usuario: </label>
                <input id='lastName' name="lastName" disabled={lastNameDisabled} type='text' placeholder="Tu apellido" value={state.lastName || ""} onChange={handleChange} />
                <button className={styles.edit} onClick={() => setLastNameDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                { !lastNameDisabled && <button className={styles.update} onClick={updateLastName}><i className='material-icons'>done</i></button>}
                </div>
                <div className={styles.separator}>
                <label htmlFor="email" style={{width: "250px"}}>Email: </label>
                <input id='email' name="email" disabled={emailDisabled} type='text' placeholder="Tu email" value={state.email || ""} onChange={handleChange} />
                <button className={styles.edit} onClick={() => setEmailDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                { !emailDisabled && <button className={styles.update} onClick={updateEmail}><i className='material-icons'>done</i></button>}
                </div>
                <div className={styles.separator}>
                <label htmlFor="password" style={{width: "250px"}}>Password: </label>
                <input id='password' name='password' disabled={passwordDisabled} type='password' placeholder='Tu contraseña nueva' value={state.password || ""} onChange={handleChange} />
                <button className={styles.edit} onClick={() => setPasswordDisabled(prev => !prev)}><i className='material-icons'>edit</i></button>
                { !passwordDisabled && <button className={styles.update} onClick={updatePassword}><i className='material-icons'>done</i></button>}
                </div>
                <span style={{color: "darksalmon", fontSize: "1rem", padding: "5px 0px"}}>
                    Ten en cuenta que si te conectas con google y cambias tu contraseña no podras loguearte y tendras que comunicarte con soporte
                </span>
            </div>
        </div>
    </div>
  )
}