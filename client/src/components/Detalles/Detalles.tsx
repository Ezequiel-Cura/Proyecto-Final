import Nav from "components/Nav/Nav";
import { Cell, Legend, Pie, PieChart, Tooltip ,BarChart,CartesianGrid,XAxis,YAxis,Bar} from "recharts";
import styles from "./Detalles.module.css";
import {  useAppSelector,useAppDispatch } from "redux/hooks";
import SearchBar from "components/SearchBar/SearchBar";
import { useEffect, useState } from "react";

import { Switch } from "@mui/material";

// ICONOS
import carrito from "assets/cart.png";
import viaje from "assets/travel.png";//eslint-disable-line
import salud from "assets/medic.png";
import combustible from "assets/car.png";
import ocio from "assets/ocio.png";
import lock from "assets/lock.png";
import dumbell from "assets/dumbell.png";
import taxes from "assets/taxes.png";
import box from "assets/other.png";//eslint-disable-line
import gift from "assets/gift.png"
import balance from "assets/balance.png"

//CONTROLADORES
import {
  totalSuper,
  totalTransporte,
  totalOcio,
  totalSalud,
  totalRegalo,
  totalAlquiler,
  totalGimnasio,
  totalImpuestos,
  calcularInputsPorMes,
  calcularOutputsPorMes,
} from "./Controladores";
import { renderInput } from "redux/reducers/userReducer/userReducer";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Detalles() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state)=>state.user.status)
  const usuario = useAppSelector((state) => state.user.usuario);
  const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`
  useEffect(()=>{
    dispatch(renderInput(date))
  },[dispatch])//eslint-disable-line

  const [switchValue,setSwitchvalue] = useState(false)

  function calculate() {

    let ingresos = usuario?.extra.input?.filter((e:any)=>e.date.includes("2022"))
    ingresos = ingresos.map((e:any)=> e.entries ).flat()
    ingresos = ingresos ? ingresos.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0

    let gastos = usuario.extra.output?.filter((e:any)=>e.date.includes("2022"))
    gastos = gastos.map((e:any)=>e.entries).flat()
    gastos = gastos ? gastos.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0

    const ingresosFijos = usuario?.monthly.input.reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0);

    const gastosFijos = usuario?.monthly?.output.reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0);

    const totalGastos = gastos + gastosFijos;       // 800
    const totalIngresos = ingresos + ingresosFijos; // 1000 + 1000
    const porcentajeGastos = Math.round((totalGastos * 100) / totalIngresos)
    const porcentajeIngreso = 100 - porcentajeGastos
    
    return { porcentajeGastos, porcentajeIngreso,totalIngresos,totalGastos };
  }

  const incomes = {
    background: "#dfd527",
    width: calculate().porcentajeIngreso + "%",
    
  };

  const gastos = {
    background: "red",
    width: calculate().porcentajeGastos + "%",
    height: "70px",
  };

  const data1 = () => {
    let gastos = status === "success" && usuario.extra.output?.find((e:any)=>e.date === date)
    gastos = gastos ? gastos.entries.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0
    const gastosFijos = usuario?.monthly?.output.reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0);
    
    const total = gastos + gastosFijos
    let data1 = usuario?.extra.output.find((e:any)=>e.date === date)
    data1 = data1 ? data1.entries.reduce((c: any, v: any) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {}) : 0
    let data2 = usuario?.monthly.output.reduce((c: any, v: any) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {})
    const data = [];

    for (const key in data1) {
      data.push({
        name: key,
        value: Math.round((data1[key] * 100) / total),
        unit: "%",
      });
    }
    for (const key in data2) {
      data.push({
        name: key,
        value: Math.round((data2[key] * 100) / total),
        unit: "%",
      })
    }
    const ulData = data.reduce((c: any, v: any) => {
      c[v.name] = (c[v.name] || 0) + v.value;
      return c;
    }, {})
 
    const elData = []
    for (const key in ulData) {
     elData.push({
        name: key,
        value: ulData[key],
        unit: "%",
     })
    }
 
    return elData;
  };
  const data2 = ()=>{
    let ingresos = status === "success" && usuario.extra.input?.find((e:any)=>e.date === date)
    ingresos = ingresos ? ingresos.entries.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0
    const ingresosFijos = usuario?.monthly?.input.reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0);
    
    const total = ingresos + ingresosFijos
    let data1 = usuario?.extra.input.find((e:any)=>e.date === date)
    data1 = data1 ? data1.entries.reduce((c: any, v: any) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {}) : 0
    let data2 = usuario?.monthly.input.reduce((c: any, v: any) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {})
    const data = [];

    for (const key in data1) {
      data.push({
        name: key,
        value: Math.round((data1[key] * 100) / total),
        unit: "%",
      });
    }
    for (const key in data2) {
      data.push({
        name: key,
        value: Math.round((data2[key] * 100) / total),
        unit: "%",
      })
    }
    const ulData = data.reduce((c: any, v: any) => {
      c[v.name] = (c[v.name] || 0) + v.value;
      return c;
    }, {})
 
    const elData = []
    for (const key in ulData) {
     elData.push({
        name: key,
        value: ulData[key],
        unit: "%",
     })
    }
    return elData;
  }

  const labelFormatter = ({ value }: any) => {
    return value + "%";
  };
  
  const meses:any = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

  const barChartData = ()=>{
    const arrayBarChart = []
    const inputs = calcularInputsPorMes(usuario)
    const gastos = calcularOutputsPorMes(usuario)

    for (let i = 0; i < 12; i++) {
     arrayBarChart.push({
      "name":meses[i],
      "Ingresos" : inputs[i],
      "Gastos": gastos[i]
     })
    }

    return arrayBarChart
  }

  const colors = ["#e27b7b", "#cfc4c4", "#96db99", "#92b0c4", "#d4ca8e","#7fffd4","#a864ca"];
  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.detalles_wrapper}>
        <h1>Detalles</h1>
        <div>
          <div>
            <h4>Resumen anualmente</h4>
            <div style={{ display: "flex" }}>
              <h5 className={styles.barra_nombres}>Ganancias</h5>
              <h5 className={styles.barra_nombres2}>Gastos</h5>
            </div>
            <div className={styles.barra_wrapper}>
              <div style={incomes}>{calculate().porcentajeIngreso} %(${calculate().totalIngresos})</div>
              <div style={gastos}>{calculate().porcentajeGastos} %(${calculate().totalGastos})</div>
              <div className={styles.div_popOut} ></div>
            </div>
            <div>
              <span>Resumen mensualmente</span>
            <BarChart width={900} height={250} data={barChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ingresos" fill="#008000" />
              <Bar dataKey="Gastos" fill="#ff0000" />
            </BarChart>
            </div>
          </div>
          <div className={styles.seccion_wrapper}>
            <div className={styles.primer_wrapper}>
              <div>
                <span>Gastos</span>
                <Switch onChange={()=>{
                  
                  setSwitchvalue(!switchValue)
                }}/>
                <span>Ingresos</span>
              </div>
              <PieChart width={500} height={400}>
                <Pie
                  data={switchValue ? data2() : data1()}
                  dataKey="value"
                  nameKey={"name"}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={labelFormatter}
                >
                  {data1().map((entry, index) => {
                    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                  })}
                </Pie>
                <Tooltip payload={data1()}/>
                <Legend />
              </PieChart>
            </div>

            <div>
              <SearchBar />
            </div>
            <div className={styles.totales}>
              <img src={carrito} alt="LOL" />{" "}
              <span>
                {" "}
                Gastos en el Super totales = ${totalSuper(usuario)}{" "}
              </span>
              <img src={gift} alt="LOL" />{" "}
              <span> Gastos de Regalos totales = ${totalRegalo(usuario)} </span>
              <img src={salud} alt="LOL" />{" "}
              <span> Gastos de Salud totales = ${totalSalud(usuario)} </span>
              <img src={combustible} alt="LOL" />{" "}
              <span>
                Gastos de Transporte totales = ${totalTransporte(usuario)}
              </span>
              <img src={ocio} alt="LOL" />{" "}
              <span>Gastos en Ocio totales = ${totalOcio(usuario)}</span>
              <img src={dumbell} alt="LOL" />{" "}
              <span>
                Gastos en Gimnasio totales = $ {totalGimnasio(usuario)}
              </span>
              <img src={taxes} alt="LOL" />{" "}
              <span>
                Gastos en Alquileres totales = $ {totalAlquiler(usuario)}
              </span>
              <img src={balance} alt="LOL" />{" "}
              <span>Gastos en Impuestos totales = $ {totalImpuestos(usuario)}</span>
            </div>
            <div className={styles.blocked_wrapper}>
              <div className={styles.blocked}>
                <img src={lock} alt="" />
                <span>Compra premium para mas detalles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
