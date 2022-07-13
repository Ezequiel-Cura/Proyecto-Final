import { useNavigate } from 'react-router-dom'

interface IReport {
  review: string
  id : string
  email: string
  report: {
    reportedBy: string
    reason: string
    status: string
    _id: string
    }
}

export default function Reports({report, id, review, email}: IReport) {
    const navigate = useNavigate()
  return (
    <tr>
        <td>{email}</td>
        <td style={{cursor: "pointer"}} onClick={() => navigate("/admin/reports", 
        {state: {report, reportedId: id, review, reportingId: report._id}})}>{report.reason}</td>
    </tr>
  )
}
