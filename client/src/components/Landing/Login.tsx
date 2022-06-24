import styles from "./Landing.module.css"
import React from 'react'
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
// import { loginUser } from "redux/reducers/userReducer"
import { useAppDispatch } from "redux/hooks"
import * as Yup from "yup"
export default function Login() {
    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Ese email no existe').required("Tu email es requerido"),
        password: Yup.string().min(4).max(30).required("dale amigo q onda no tenes contraseña")
      });
  return (
    <div className={styles.formContainer}>
        <div className={styles.textContainer}>
            <h3>Bienvenido devuelta! Inicia sesión</h3>
        </div>
        <Formik
        initialValues={{
            email: "",
            password: ""
        }}
        validationSchema={SigninSchema}
        onSubmit = {((values, {setFieldError}) => {
            console.log(values)
        })}
        >
            {({isSubmitting}) => (
                <Form className={styles.form}>
                    <Field className={styles.input} style={{padding: "10px 20px"}} name="Email" type="text" placeholder="Email"/>
                    <ErrorMessage className={styles.errorMessage} name="email" component="span"/>
                    <Field className={styles.input} style={{padding: "10px 20px"}} name="Contraseña" type="password" placeholder="Contraseña"/>
                    <ErrorMessage className={styles.errorMessage} name="password" component="span"/>
                    <div className={styles.buttons}>
                        <div className={styles.checkboxContainer}>
                            <input id="recordarme" type="checkbox"/> 
                            <label htmlFor="recordarme" style={{marginLeft: "5px"}}>Recordarme</label>
                        </div>
                        <div style={{display: "flex", marginTop: "2px", flexDirection: "row", alignItems: "top"}}>
                            <h4 style={{margin: "0px"}}>No tienes cuenta?</h4>
                            <Link to="/" state={{registered: false}} style={{marginLeft: "3px", color: "var(--btn-color)"}}>Registrate</Link>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button}>Conectate</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div> 
  )
}