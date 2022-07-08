import styles from "./Review.module.css"
import React from 'react'
import imagePlaceholder from "assets/imagePlaceholder.jpg"
import { Rating } from "@mui/material"

export interface userReview {
  user: { 
    avatar: string
    text : string
    firstName: string
    review : { 
      text: string
      rating: number
    }
  }
}

export default function Review({user}: any) {
  return (
    <div className={styles.wrapper}>
      {user ? 
      <>
      <div>
      <img src={user.avatar ? user.avatar : imagePlaceholder} className={styles.img} referrerPolicy="no-referrer"/>
      </div>
      <div className={styles.reviewWrapper}>
        <h4 style={{color: "#848282", overflowWrap: "anywhere"}}>"{user?.review?.text}"</h4>
        <div>
        <h2 style={{color: "#6B6666"}}>{user?.firstName}</h2>
        <Rating value={user?.review?.rating || 0} readOnly/>
        </div>
      </div>
      </>
      : <h1 style={{color: "black", fontSize: "2rem"}}>There are currently no reviews</h1>
      }
    </div>
  )
}

