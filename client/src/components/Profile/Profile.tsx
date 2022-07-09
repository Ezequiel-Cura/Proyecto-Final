import React, { ChangeEvent, FormEvent, FormEventHandler, SyntheticEvent, useEffect, useState } from 'react'
import Nav from 'components/Nav/Nav'
import styles from "./Profile.module.css"
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import ImageEditor from './utils/ImageEditor'
import { updatePersonalInfo } from '../../redux/reducers/userReducer/userReducer'
import { Rating } from '@mui/material'
import addReview from 'redux/reducers/userReducer/actions/addReview'
import { flexbox } from '@mui/system'
import deleteReview from 'redux/reducers/userReducer/actions/deleteReview'
import sendSupportMessage from 'redux/reducers/userReducer/actions/sendSupportMessages'

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
    const [reviewMsg, setReviewMsg] = useState("")
    const [supportMessage, setSupportMessage] = useState("")
    const [supportConfirmationMessage, setSupportConfirmationMessage] = useState("")
    
    const [review, setReview] = useState({
        text: "",
        rating: 0,
    })

    useEffect(()=>{
    setState({firstName: usuario.firstName,lastName: usuario.lastName,password: ""})
    setReview(usuario.review)
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
            }, 3000)})
    }
    function updateLastName(){
        dispatch(updatePersonalInfo({key: "lastName", value: state.lastName}))
        .then(() => {
            setLastNameDisabled(true)
            setMsg("Tu apellido fue actualizado")
            setTimeout(() => {
                setMsg("")
            }, 3000)})
    }
    
    function updatePassword(){
        dispatch(updatePersonalInfo({key: "password", value: state.password}))
        .then(() => {
            setPasswordDisabled(true)
            setMsg("Tu contraseña fue actualizada")
            setTimeout(() => {
                setMsg("")
            }, 3000)})
    }
    function handleReviewChange (event: ChangeEvent<HTMLTextAreaElement>) {
        setReview({...review, [event.target.name] : event.target.value})
    }

    const uploadReview = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (review.text.length > 200) return
        if (review.rating > 5 || review.rating < 0) return
        dispatch(addReview(review))
        .then(() => {
            setReviewMsg("Tu review se ha subido")
            setTimeout(() => {
                setReviewMsg("")
            }, 3000)})
    }

    function handleSupportMessage (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!supportMessage.length) return
        dispatch(sendSupportMessage(supportMessage))
        .then(() => {
            setSupportMessage("")
            setSupportConfirmationMessage("Tu Mensaje se ha enviado")
            setTimeout(() => {
                setSupportConfirmationMessage("")
            }, 3000)})
    }

    function handleSupportMessageChange (event: ChangeEvent<HTMLTextAreaElement>) {
        setSupportMessage(event.target.value)
    }

  return (
    <div className={styles.wrapper}>
        <Nav/>
        {
            imageEditor && <ImageEditor setImageEditor={setImageEditor}/>
        }
        <div className={styles.leftInfoWrapper}>
            <h1 style={{fontSize: "3rem", fontWeight: "200"}}>Cuenta</h1>
            <div className={styles.formsContainer}>
                <div className={styles.reseñas}>
                    {reviewMsg ?
                    <h3 style={{backgroundColor: "#20B2AA", padding:"4px",marginBottom: "10px" , color: "white"}}>{reviewMsg}</h3>
                    :
                    <h3 style={{backgroundColor: "#2E332C", padding:"4px",marginBottom: "10px" , color: "#797979"}}>Deja una reseña !</h3>
                    }
                    <form onSubmit={uploadReview}>
                    <label htmlFor='review'>{usuario.review ? "Modifica tu reseña" : "escribe tu primer reseña"}:</label>
                    <textarea maxLength={200} className={styles.reviewInput} id='review' name='text' placeholder="Coloque aqui su reseña" value={review?.text || ""} onChange={handleReviewChange}/>
                    <div style={{display: "flex", justifyContent:"space-between"}}>
                        <div>
                            <label htmlFor='rating'>Calificacion:</label>
                            <Rating id='rating' name="rating" value={review?.rating || 0} style={{display: "flex", alignItems: "center"}}
                                onChange={(event, newValue: any) => {
                                    setReview({...review, rating: newValue})
                                }}/>
                        </div>
                        <div style={{display: "flex", gap: "5px"}}>
                        <button type='button' className={styles.reviewDeleteButton} onClick={() => dispatch(deleteReview())}>Borrar</button>
                        <button className={styles.reviewSendButton}>Enviar</button>
                        </div>
                    </div>
                    </form>
                </div>
                <div className={styles.soporte}>
                {supportConfirmationMessage ?
                    <h3 style={{backgroundColor: "#20B2AA", padding:"4px",marginBottom: "10px" , color: "white"}}>{supportConfirmationMessage}</h3>
                    :
                    <h3 style={{backgroundColor: "#2E332C", padding:"4px",marginBottom: "10px" , color: "#797979"}}>Comunicate con soporte:</h3>
                    }
                    <form onSubmit={handleSupportMessage}>
                    <textarea maxLength={500} className={styles.reviewInput} placeholder="Coloque aqui su mensaje para soporte" value={supportMessage || ""} onChange={handleSupportMessageChange}/>
                    <div style={{display: "flex", justifyContent:"right"}}>
                        <button className={styles.reviewSendButton}>Enviar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <div className={styles.rightInfoWrapper}>
            <img referrerPolicy="no-referrer" src={usuario.avatar ? usuario.avatar : imagePlaceholder} alt="Profile pic" className={styles.profilePic} onClick={()=> setImageEditor(true)}/>
            <div className={styles.infoContainer}>
                { msg && <h1 className={styles.msg}>{msg}</h1>}
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