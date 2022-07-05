import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import styles from "./ImageEditor.module.css"
import AvatarEditor from "react-avatar-editor"
import { uploadImage } from 'redux/reducers/userReducer'

export default function ImageEditor({setImageEditor}: any) {
const {usuario} = useAppSelector(({user})=> user)
const dispatch = useAppDispatch()
const [image, setImage] = useState("")
let avatarEditor: any = {};

function handleImage({target}: any) {
    setImage(target.files[0])
}

function handleDrop(dropped: any) {
    setImage(dropped[0])
}

function handleCropImage(editor: any) {
    if (editor) avatarEditor = editor
}

function submitImage() {
    if (image === "") return setImageEditor(false)
    const img = avatarEditor.getImageScaledToCanvas().toDataURL()
    dispatch(uploadImage({img, id: usuario._id}))
    setImageEditor(false)
}
  return (
    <div className={styles.wrapper}>
        <div className={styles.topAvatarEditorContainer}>
            <h1>Your profile photo</h1>
        </div>
            <Dropzone maxFiles={1} multiple={false} noClick noKeyboard onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })} className={styles.dropZone}>
                    <input {...getInputProps()}/>
                    {
                        image ? null : <p style={{userSelect: "none", position: "absolute"}}>Suelta tu imagen aquí</p>
                    }
                    <AvatarEditor ref={handleCropImage} border={image ? 3 : 0} width={200} color={[255, 255, 255, 0.9]} image={image} className={styles.avatarEditor} style={image ? {cursor: "grab", borderRadius: "4px"} : {cursor: "default"}}/>
                </div>
                )}
            </Dropzone>
        <div className={styles.bottomAvatarEditorContainer}>
        <input className={styles.imageInput} accept=".jpg, .jpeg, .png" type="file" multiple={false} onChange={handleImage}/>
        <button className={styles.acceptButton} style={{width: "30%"}} onClick={submitImage}>Aceptar</button>
        </div>
        <button className={styles.closeButton} onClick={() => setImageEditor(false)}><i className='material-icons'>close</i></button>
    </div>
  )
}
