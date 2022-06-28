import React, { useEffect } from 'react'
import styles from "./Landing.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { googleLogin, loginUser } from "redux/reducers/userReducer"
import { useAppDispatch } from "redux/hooks"
import * as Yup from "yup"

export default function Login() {
    const navigate = useNavigate()
    const {state} : any = useLocation()
    const dispatch = useAppDispatch()
    const SigninSchema = Yup.object().shape({
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
    },[])
    
    function handleGoogleLogin(response: any) {
    dispatch(googleLogin(response.credential))
    .then(()=> navigate("/home"))
    }


  return (
    <div className={styles.formContainer}>
        <div className={styles.textContainer}>
        {
          state?.message ? <h3 style={{color: "rgba(3, 224, 21, 1)", padding: "20px"}}>{state.message}</h3> : <h3>Te extrañamos ! inicia sesión</h3>
        }
        </div>
        <Formik
        initialValues={{
            email: "",
            password: "",
            message: ""
        }}
        validationSchema={SigninSchema}
        onSubmit = {(({email, password}, {setFieldError}) => {
        return dispatch(loginUser({email, password}))
            .then((resp: any)=> {
                if (resp.error) return setFieldError("message", resp.payload)
                navigate("/home")
            })
        })
        }>
            {({isSubmitting}) => (
                <Form className={styles.form}>
                    <Field className={styles.input} style={{padding: "10px 20px"}} name="email" type="text" placeholder="Email"/>
                    <ErrorMessage className={styles.errorMessage} name="email" component="span"/>
                    <Field className={styles.input} style={{padding: "10px 20px"}} name="password" type="password" placeholder="Contraseña"/>
                    <ErrorMessage className={styles.errorMessage} name="password" component="span"/>
                    <ErrorMessage className={styles.errorMessage} name="message" component="span"/>
                    <div className={styles.buttons}>
                    {
                        state.message ? <h4 style={{color: "rgba(3, 224, 21, 1)"}}>Esta es la mejor aplicación para controlar tus finanzas que vas a encontrar 💸</h4> :  
                        <div style={{display: "flex", marginTop: "2px", flexDirection: "row", alignItems: "top"}}>
                            <h4 style={{margin: "0px"}}>No tienes cuenta?</h4>
                            <Link to="/" state={{registered: false}} style={{marginLeft: "3px", color: "var(--btn-color)"}}>Registrate</Link>
                        </div>
                    }
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button}>Conectate</button>
                        <button id="signInDiv"></button>
                    </div>
                </Form>
            )}
        </Formik>
    </div> 
  )
}