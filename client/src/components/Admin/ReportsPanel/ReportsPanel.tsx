import styles from "./ReportsPanel.module.css"
import { useEffect, useState } from 'react'
import Nav from "components/Nav/Nav"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import getAllUsers from "redux/reducers/adminReducer/Actions/getAllUsers"
import { useLocation } from "react-router-dom"
import getUserById from "redux/reducers/adminReducer/Actions/getUserById"
import CustomUserReportHud from "./utils/CustomUserReportHud/CustomUserReportHud"

export default function ReportsPanel() {
  const {state}: any = useLocation()

  // const dispatch = useAppDispatch()
  // const {allUsers} = useAppSelector(({admin}) => admin)
  // const [unReviewedReports, setUnReviewedReports] = useState<any>([])
  
  // useEffect(() => {
  //   dispatch(getAllUsers())
  // }, [])

  // useEffect(()=>{
  //   setUnReviewedReports(allUsers.filter(user => user.review.reports.filter(report => report.status !== "reviewed").length > 0))
  // },[allUsers])

  // useEffect(()=>{
  // },[unReviewedReports])
  
  return (
    <div className={styles.wrapper}>
      <Nav />
        {
          <CustomUserReportHud key={state?.report._id} review={state?.review} reportedId={state?.reportedId} report={state?.report}/>
        }
    </div>
  )
}
