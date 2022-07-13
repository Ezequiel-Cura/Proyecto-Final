import styles from "./MessagesPanel.module.css"
import Nav from "components/Nav/Nav"
import { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch } from "redux/hooks"
import adminSendMessage from "redux/reducers/adminReducer/Actions/adminSendMessage"

export default function MessagesPanel() {
const dispatch = useAppDispatch()
const [messageValue, setMessageValue] = useState("")
const [titleValue, setTitleValue] = useState("")
const [modalPreview, setModalPreview] = useState(false)

function handleMessageChange (event: ChangeEvent<HTMLTextAreaElement>) {
  setMessageValue(event.target.value)
}
function handleTitleChange (event: ChangeEvent<HTMLInputElement>) {
  setTitleValue(event.target.value)
}

function handleFormSubmit (event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  setModalPreview(false)
  if (!titleValue) return alert("No escribiste el titulo")
  if (!messageValue) return alert("No escribiste el mensaje")
  dispatch(adminSendMessage({msg: messageValue, subject: titleValue}))
  .then((resp: any) => {
    if (resp.error) return alert("hubo un error")
    setMessageValue("")
    alert("Se ha enviado el mensaje a todos los usuarios")
  })
}

  return (
    <div className={styles.wrapper}>
        <Nav/>
        <div className={styles.container}>
          {modalPreview &&
            <div className={styles.modal}>
              <h1 style={{color: "red", margin: "0px"}}>Estas seguro de mandar este mensaje? le llegara a todos los usuarios que no se hayan desuscripto de los mails</h1>
              <button type="submit" form="form" className={styles.button} style={{alignSelf: "center", backgroundColor: "red"}}>Enviar mensaje</button>
            </div>
          }
        <form id="form" className={styles.formContainer} onSubmit={handleFormSubmit}>
            <label htmlFor="subject">Titulo:</label>
            <input className={styles.subjectInput} maxLength={50} id="subject" placeholder="Titulo del mensaje" value={titleValue || ""} onChange={handleTitleChange}/>
            <label htmlFor="message">Mensaje a enviar a todos los usuarios:</label>
            <textarea maxLength={200} className={styles.messageInput} id='message' placeholder="Coloque aqui su mensaje" value={messageValue || ""} onChange={handleMessageChange}/>
            <button onClick={() => setModalPreview(true)} type="button" className={styles.button}>Enviar mensaje</button>
        </form>
        </div>
    </div>
  )
}

