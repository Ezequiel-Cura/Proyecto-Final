import React from 'react'
import styles from "./Landing.module.css"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { registerUser } from "redux/reducers/userReducer"
import { useAppDispatch } from "redux/hooks"
import * as Yup from "yup"

export default function Register() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().max(30, 'Re largo tu nombre').required("Tu nombre es requerido"),
    lastName: Yup.string().max(30, 'Re largo tu apellido').required("Tu apellido es requerido"),
    email: Yup.string().email('Ese email no existe').required("Tu email es requerido"),
    password: Yup.string().min(4).max(30).required("dale amigo q onda no tenes contraseña")
  });
  const dispatch = useAppDispatch()
  return (
    <div  className={styles.formContainer}>
       <div className={styles.textContainer}>
          <h3>Bienvenido! Registrate</h3>
        </div>
      <Formik 
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, {setFieldError}) => {
          console.log(values)
          // return dispatch(registerUser(values))
          // .catch((err: any)=> {
          //  setFieldError()
          // })
        }}>
          {({isSubmitting}) => (
              <Form className={styles.form}>
              <Field className={styles.input}name="firstName" type="text" placeholder="Nombre"/>
              <ErrorMessage className={styles.errorMessage} name="firstName" component="span"/>
              <Field className={styles.input} name="lastName" type="text" placeholder="Apellido"/>
              <ErrorMessage className={styles.errorMessage} name="lastName" component="span"/>
              <Field className={styles.input} name="email" type="text" placeholder="Email"/>
              <ErrorMessage className={styles.errorMessage} name="email" component="span"/>
              <Field className={styles.input} name="password" type="password" placeholder="Contraseña"/>
              <ErrorMessage className={styles.errorMessage} name="password" component="span"/>
                <div className={styles.buttons}>
                  <div style={{display: "flex", marginTop: "2px", flexDirection: "row", alignItems: "top"}}>
                    <h4 style={{margin: "0px"}}>Ya tienes cuenta?</h4>
                    <Link to="/" state={{registered: true}} style={{marginLeft: "3px", textDecoration: 'none', color: "var(--btn-color)"}}>Inicia Sesión</Link>
                  </div>
                </div>
              <div className={styles.buttonContainer}>
                <button type="submit" disabled={isSubmitting} className={styles.button}>Registrarme</button>
              </div>
            </Form>
          )}
      </Formik> 
    </div>
  )
}
