import styles from "./InfoChart.module.css" // eslint-disable-line
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function InfoChart  ({data}: any) {
  const count: any = {};
  data.forEach((e : string) => count[e] = (count[e] || 0) + 1)
  const info: any = []
  Object.entries(count).map((e: any) => info.push({day: e[0], value: e[1]}))
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={info} margin={{top: 10,right: 30,left: 0,bottom: 0}}>
        <Tooltip />
        <XAxis dataKey="day" axisLine={false} />
        <YAxis dataKey="value" axisLine={false} tickLine={false} />
        <Area type="natural" dataKey="value" stroke="#2451B7" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}