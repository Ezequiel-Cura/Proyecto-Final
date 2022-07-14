import { useEffect, useState } from 'react'
import styles from "../index.module.css"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { registerUser } from "redux/reducers/userReducer/actions/registerUser"
import { useAppDispatch } from "redux/hooks"
import * as Yup from "yup"
import { googleLogin } from 'redux/reducers/userReducer/actions/googleLogin'

export default function Register() {
  const dispatch = useAppDispatch()
  const [registeredMsg, setRegisteredMsg] = useState("")
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().max(30, 'Re largo tu nombre').required("Tu nombre es requerido"),
    lastName: Yup.string().max(30, 'Re largo tu apellido').required("Tu apellido es requerido"),
    email: Yup.string().email('Ese email no existe').required("Tu email es requerido"),
    password: Yup.string().min(4, "Tu contraseña es muy corta").max(30, "wtf re largo eso").required("dale amigo q onda no tenes contraseña")
  });
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_ID,
        callback: handleGoogleLogin
        })
    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {width: "100%",longtitle: true,theme: 'dark'}
        )
    },[])// eslint-disable-line
    
    function handleGoogleLogin(response: any) {
      dispatch(googleLogin(response.credential))
    }
  return (
    <div  className={styles.formContainer}>
      <div className={styles.textContainer}>
        <h3>Bienvenido! Registrate</h3>
      </div>
      <Formik 
        initialValues={{firstName: "", lastName: "", email: "", password: ""}}
        validationSchema={SignupSchema}
        onSubmit={(values, {setFieldError}) => {
          return dispatch(registerUser(values))
          .then((resp: any) => {
              if (resp.error) return setFieldError("email", resp.payload)
              setRegisteredMsg(resp.payload.message)
          })}}>
        {() => (
            <Form className={styles.form}>
            <Field className={styles.input}name="firstName" type="text" placeholder="Nombre"/>
            <ErrorMessage className={styles.errorMessage} name="firstName" component="span"/>
            <Field className={styles.input} name="lastName" type="text" placeholder="Apellido"/>
            <ErrorMessage className={styles.errorMessage} name="lastName" component="span"/>
            <Field className={styles.input} name="email" type="text" placeholder="Email"/>
            <ErrorMessage className={styles.errorMessage} name="email" component="span"/>
            <Field className={styles.input} name="password" type="password" placeholder="Contraseña"/>
            <ErrorMessage className={styles.errorMessage} name="password" component="span"/>
            {registeredMsg && <h3 style={{color: "lightGreen", textAlign: "center", margin: "5px 0px"}}>{registeredMsg}</h3>}
            <div className={styles.buttons}>
              <div style={{display: "flex", marginTop: "2px", flexDirection: "row", alignItems: "top"}}>
                <h4 style={{margin: "0px"}}>Ya tienes cuenta?</h4>
                <Link to="/login" state={{registered: true}} style={{marginLeft: "3px", textDecoration: 'none', color: "var(--btn-color)"}}>Inicia Sesión</Link>
              </div>
            </div>
            <button type="submit" className={styles.button}>Registrarme</button>
            <div id="signInDiv" className={styles.googleLogin}/>
          </Form>
        )}
      </Formik> 
    </div>
  )
}