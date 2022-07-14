import styles from "./VerifyEmail.module.css"
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import success from "assets/success.png"

export default function VerifyEmail() {
    const [validUrl, setValidUrl] = useState(false)
    const [msg, setMsg] = useState("")
    const params = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const {data} = await axios.get(`/user/register/${params.id}/verify/${params.token}`);
                setMsg(data)
                setValidUrl(true)
                localStorage.removeItem("unVerified")
            } catch (err: any) {
                setMsg(err.response.data)
                setValidUrl(false)                
            }
        }
        	verifyEmailUrl()
    }, [])// eslint-disable-line
return (
    <div className={styles.wrapper}>
    {
        validUrl ? (
        <div className={styles.container}>
            <img src={success} alt="success imagen" className={styles.success_img} />
            <h1>{msg}</h1>
            <Link to="/login" state={{registered: true}}>
                <button className={styles.btn}>
                    Login
                </button>
            </Link>
        </div>
        ) : 
        <div className={styles.container}>
            <h1>{msg}</h1>
            <Link to="/login">
                <button className={styles.btn}>
                    Registrate
                </button>
            </Link>
        </div>
    }
    </div>
  )
}