import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IReport {
    report: {
    reportedBy: string
    reason: string
    status: string
    _id: string
    }
    id : string
}

export default function Reports({report, id}: IReport) {
    const navigate = useNavigate()
    console.log(report)
  return (
    <tr>
        <td style={{cursor: "pointer"}} onClick={() => navigate("/admin/reports", 
        {state: {reportedId: id, reportingId: report._id}})}>{report.reason}</td>
    </tr>
  )
}
