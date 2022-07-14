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



export default function Detalles() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state)=>state.user.status)
  const usuario = useAppSelector((state) => state.user.usuario);
  const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

  useEffect(()=>{
    dispatch(renderInput(date))
  },[dispatch])//eslint-disable-line

  const [switchValue,setSwitchvalue] = useState(false)
  const [year,setYear] = useState(date.split("-")[0])
  const [month,setMonth] = useState("01")

  function calculate() {

    let ingresos = usuario?.extra.input?.filter((e:any)=>e.date.includes(year))
    ingresos = ingresos.map((e:any)=> e.entries ).flat()
    ingresos = ingresos ? ingresos.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0

    let gastos = usuario.extra.output?.filter((e:any)=>e.date.includes(year))
    gastos = gastos.map((e:any)=>e.entries).flat()
    gastos = gastos ? gastos.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0

    const ingresosFijos = usuario?.monthly.input.filter((e:any)=>e.date.includes(year)).reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0);

    const gastosFijos = usuario?.monthly?.output.filter((e:any)=>e.date.includes(year)).reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0);

    const totalGastos = gastos + gastosFijos;       // 800
    const totalIngresos = ingresos + ingresosFijos; // 1000 + 1000

    let porcentajeGastos = Math.round((totalGastos * 100) / totalIngresos)
    // const porcentajeIngreso1 = 100 - porcentajeGastos

    let porcentajeIngreso = 100
    
    if(totalIngresos === 0){
      porcentajeIngreso = 0;
    }

    const sobrante = totalIngresos - totalGastos
    let sobrantePorcentaje = porcentajeIngreso - porcentajeGastos
    // let dificit = totalGastos - totalIngresos
    
    
    let deficitPorcentaje = porcentajeGastos - porcentajeIngreso
    if(deficitPorcentaje < 0){
      
      deficitPorcentaje = 0;
    }
    if(sobrantePorcentaje < 0){
      sobrantePorcentaje = 0
    }
    if(isNaN(porcentajeGastos)){
      porcentajeGastos = 0
    }
    
    

    return { porcentajeGastos, porcentajeIngreso,totalIngresos,totalGastos,sobrante,sobrantePorcentaje,deficitPorcentaje };
  }

  const incomes = {
    background: "#316ab6",
    width: calculate().porcentajeIngreso + "%",
    height: "50px",
    border: "1px black solid"
  };

  const gastos = {
    background: "#f94144",
    width: calculate().porcentajeGastos + "%",
    height: "50px",
    border: "1px black solid"
  };

  const sobrante = {
    background: "green",
    width: calculate().sobrantePorcentaje + "%",
    height: "50px",
    border: "1px black solid"
  }
  const deficit = {
    background: "orange",
    width: calculate().deficitPorcentaje + "%",
    height: "50px",
    border: "1px black solid"
  }
  const data1 = () => {
    let gastos = status === "success" && usuario.extra.output?.find((e:any)=>e.date === year+"-" + month)
    
    gastos = gastos ? gastos.entries.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0;

    const gastosFijos =usuario?.monthly?.output.filter((e:any)=>e.date.includes(year+"-"+month)) ?  usuario?.monthly?.output.filter((e:any)=>e.date.includes(year+"-"+month)).reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0) : 0;

    
    const total = gastos + gastosFijos
    let data1 = usuario?.extra.output.find((e:any)=>e.date === year+"-"+month)
    data1 = data1 ? data1.entries.reduce((c: any, v: any) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {}) : 0
    let data2 = usuario?.monthly.output.filter((e:any)=>e.date.includes(year+"-"+month)).reduce((c: any, v: any) => {
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
    let ingresos = status === "success" && usuario.extra.input?.find((e:any)=>e.date === year +"-"+month)
    ingresos = ingresos ? ingresos.entries.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) : 0
    const ingresosFijos = usuario?.monthly?.input.filter((e:any)=>e.date.includes(year +"-"+ month)) ? usuario?.monthly?.input.filter((e:any)=>e.date.includes(year +"-"+ month)).reduce(
      (prev: any, actual: any) => {
        return prev + actual.amount;
    },0) : 0;
    
    const total = ingresos + ingresosFijos
    let data1 = usuario?.extra.input.find((e:any)=>e.date === year+"-"+month)
    data1 = data1 ? data1.entries.reduce((c: any, v: any) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {}) : 0
    let data2 = usuario?.monthly.input.filter((e:any)=>e.date.includes(year +"-"+ month)).reduce((c: any, v: any) => {
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
    const inputs = calcularInputsPorMes(usuario,year)
    const gastos = calcularOutputsPorMes(usuario,year)

    for (let i = 0; i < 12; i++) {
     arrayBarChart.push({
      "name":meses[i],
      "Ingresos" : inputs[i],
      "Gastos": gastos[i]
     })
    }

    return arrayBarChart
  }

  function handleChangeYear(op:any){
    const thisYear:number = Number(year)
    op === '+' ? setYear((thisYear + 1).toString()) :
    op === '-' ? setYear((thisYear - 1).toString()) :
    op === '' && setYear(new Date().getFullYear().toString())
  }
  function handleChangeMonth(e:any){
    setMonth(e.target.value)
  }
  
  const colors = ["#e27b7b", "#cfc4c4", "#96db99", "#92b0c4", "#d4ca8e","#7fffd4","#a864ca"];
  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.detalles_wrapper}>
        <h1>Detalles</h1>
        <div>
          <div className={styles.select_detail}>
            <div className={styles.yearSelect}>
							<button className={styles.yearLeft} onClick={() => handleChangeYear('-')}>{'<'}</button>
							<button className={styles.yearCenter} onClick={() => handleChangeYear('')}>{year}</button>
							<button className={styles.yearRight} onClick={() => handleChangeYear('+')}>{'>'}</button>
						</div>
            {/* <select name="years" id="" onChange={(e)=>{handleChangeYear(e)}}>
              <option value="2022">2022</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select> */}
          </div>
          <div>
            <h4>Resumen anual Ingresos</h4>
            {/* <div style={{ display: "flex" }}>
              <h5 className={styles.barra_nombres}>Ingresos</h5>
              <h5 className={styles.barra_nombres2}>Gastos</h5>
            </div> */}
            <div className={styles.barra_wrapper}>
              <div>
                {
                  calculate().porcentajeIngreso !== 0 ? 
                  (
                    <>
                      <div style={incomes}>Ingresos  {calculate().porcentajeIngreso} %(${calculate().totalIngresos})</div>
                      <div style={deficit}>{calculate().sobrante < 0 ? "Deficit  -" + calculate().deficitPorcentaje + "%($"+ calculate().sobrante+")" : null }</div>
                    </>
                  )
                  :
                  <div style={incomes}></div>
                }
              </div>
              <div style={{"display" : "flex"}}>
                {
                  calculate().porcentajeGastos !== 0 ?
                  (
                    <>
                      <div style={gastos}>Gastos  {calculate().porcentajeGastos} %(${calculate().totalGastos})</div>
                      <div style={sobrante}>{calculate().sobrantePorcentaje > 0 ?"Superavit  "+ calculate().sobrantePorcentaje + "%($"+calculate().sobrante : null } </div>
                    </>
                  )
                  :
                  <div style={gastos}></div>
                }
              </div>
              <div className={styles.div_popOut} ></div>
            </div>
            <div>
              <span>Resumen mensual</span>
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
                <select name="" id="" onChange={(e)=>{handleChangeMonth(e)}}>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
              {
                 usuario.premium === true ? 
                 (
                  <>
                    <div>                
                      <span>Gastos</span>
                      <Switch onChange={()=>{
                        setSwitchvalue(!switchValue)
                      }}/>
                      <span>Ingresos</span>                  
                    </div>                  
                  </>
                 ):
                 null
              }
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
              <div>
                <img src={carrito} alt="LOL" />{" "}
                <span>
                  {" "}
                  Gastos en el Super totales = ${totalSuper(usuario)}{" "}
                </span>
              </div>

              <div>
                <img src={gift} alt="LOL" />{" "}
                <span> Gastos de Regalos totales = ${totalRegalo(usuario)} </span>
              </div>

              <div>
                <img src={salud} alt="LOL" />{" "}
                <span> Gastos de Salud totales = ${totalSalud(usuario)} </span>
              </div>

              <div>
                <img src={combustible} alt="LOL" />{" "}
                <span>
                  Gastos de Transporte totales = ${totalTransporte(usuario)}
                </span>
              </div>

              <div>
                <img src={ocio} alt="LOL" />{" "}
                <span>Gastos en Ocio totales = ${totalOcio(usuario)}</span>
              </div>

              <div>
                <img src={dumbell} alt="LOL" />{" "}
                <span>
                  Gastos en Gimnasio totales = $ {totalGimnasio(usuario)}
                </span>
              </div>

              <div>
                <img src={taxes} alt="LOL" />{" "}
                <span>
                  Gastos en Alquileres totales = $ {totalAlquiler(usuario)}
                </span>
              </div>

              <div>
                <img src={balance} alt="LOL" />{" "}
                <span>Gastos en Impuestos totales = $ {totalImpuestos(usuario)}</span>
              </div>

            </div>
            <div className={styles.blocked_wrapper}>
              <div className={styles.blocked}>
                {
                  usuario.premium === false ? 
                  (
                    <>
                      <img src={lock} alt="" />
                      <span>Compra premium para mas detalles</span>
                    </>
                  )
                  :
                  (
                    <>
                      <span>Tienes nuevos botones para usar!!</span>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
