import styles from "./Review.module.css"
import React from 'react'
import imagePlaceholder from "assets/imagePlaceholder.jpg"

interface userReview {
  userReview: { [key: string]: string }
}

export default function Review({userReview}: userReview) {
  return (
    <div className={styles.wrapper}>
      {userReview ? 
      <>
      <img src={userReview.avatar ? userReview.avatar : imagePlaceholder} className={styles.img} referrerPolicy="no-referrer"/>
      <div className={styles.reviewWrapper}>
        <h4 style={{color: "#848282", overflowWrap: "anywhere"}}>"{userReview.review}"</h4>
        <h2 style={{color: "#6B6666"}}>{userReview.firstName} {userReview.lastName}</h2>
      </div>
      </>
      : <h1 style={{color: "black"}}>There are currently no reviews</h1>
      }
    </div>
  )
}

