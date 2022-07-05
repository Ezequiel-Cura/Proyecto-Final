import Nav from "components/Nav/Nav";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styles from "./Detalles.module.css";
import { useAppSelector } from "redux/hooks";
import SearchBar from "components/SearchBar/SearchBar";

// ICONOS
import carrito from "assets/cart.png";
import viaje from "assets/travel.png";
import salud from "assets/medic.png";
import combustible from "assets/car.png";
import ocio from "assets/ocio.png";
import lock from "assets/lock.png";
import dumbell from "assets/dumbell.png";
import taxes from "assets/taxes.png";
import box from "assets/other.png";

//CONTROLADORES
import {
  totalAlimentos,
  totalCombustible,
  totalOcio,
  totalSalud,
  totalViajes,
  totalAlquiler,
  totalGimnasio,
  totalOther,
} from "./Controladores";

export default function Detalles() {
  const usuario = useAppSelector((state) => state.user.usuario);

  const styleBar = {
    border: "2px solid white",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
  };
  function calculate() {
    const ingresos = usuario?.Account.extraInput.reduce((prev, actual) => {
      return prev + actual.amount;
    }, 0);
    const ingresosFijos = usuario?.Account.monthlyInput.reduce(
      (prev, actual) => {
        return prev + actual.amount;
      },
      0
    );

    const gastos = usuario?.Account.variableExpenses.reduce((prev, actual) => {
      return prev + actual.amount;
    }, 0);
    const gastosFijos = usuario?.Account.monthlyExpenses.reduce(
      (prev, actual) => {
        return prev + actual.amount;
      },
      0
    );

    const totalGastos = gastos + gastosFijos;
    const totalIngresos = ingresos + ingresosFijos;

    const total = totalGastos + totalIngresos;
    const porcentajeGastos = Math.round((totalGastos * 100) / total);
    const porcentajeIngreso = 100 - porcentajeGastos;
    return { porcentajeGastos, porcentajeIngreso };
  }

  const incomes = {
    background: "green",
    width: calculate().porcentajeIngreso + "%",
    height: "100px",
  };

  const gastos = {
    background: "red",
    width: calculate().porcentajeGastos + "%",
    height: "100px",
  };

  const data1 = () => {
    const gastos = usuario.Account.variableExpenses.reduce((prev, actual) => {
      return prev + actual.amount;
    }, 0);
    const gastosFijos = usuario?.Account.monthlyExpenses.reduce(
      (prev, actual) => {
        return prev + actual.amount;
      },
      0
    );
    const total = gastos + gastosFijos
    console.log(total)
    let data1 = usuario?.Account.variableExpenses.reduce((c, v) => {
      c[v.category] = (c[v.category] || 0) + v.amount;
      return c;
    }, {});
    let data2 = usuario?.Account.monthlyExpenses.reduce((c, v) => {
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
    const ulData = data.reduce((c, v) => {
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
  const labelFormatter = ({ value }) => {
    return value + "%";
  };
  
 
  const colors = ["#e27b7b", "#cfc4c4", "#96db99", "#92b0c4", "#d4ca8e","#7fffd4","#a864ca"];
  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.detalles_wrapper}>
        <h1>Detalles</h1>
        <div>
          <div>
            <div style={{ display: "flex" }}>
              <h5>Ingresos</h5>
              <h5 style={{ marginLeft: "200px" }}>gastos</h5>
            </div>
            <div style={styleBar}>
              <div style={incomes}>{calculate().porcentajeIngreso} %</div>
              <div style={gastos}>{calculate().porcentajeGastos} %</div>
            </div>
          </div>
          <div className={styles.seccion_wrapper}>
            <div className={styles.primer_wrapper}>
              <PieChart width={500} height={400}>
                <Pie
                  data={data1()}
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
                Gastos de Alimentos totales = ${totalAlimentos(usuario)}{" "}
              </span>
              <img src={viaje} alt="LOL" />{" "}
              <span> Gastos de Viajes totales = ${totalViajes(usuario)} </span>
              <img src={salud} alt="LOL" />{" "}
              <span> Gastos de Salud totales = ${totalSalud(usuario)} </span>
              <img src={combustible} alt="LOL" />{" "}
              <span>
                Gastos de Combustible totales = ${totalCombustible(usuario)}
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
              <img src={box} alt="LOL" />{" "}
              <span>Otros gastos totales = $ {totalOther(usuario)}</span>
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
