

export function totalRegalo(usuario: any) {
  
  const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

 let extraRegalo = usuario?.extra.output?.find((e: any) => e.date === date)

const regaloFiltrado = extraRegalo?.entries.filter((e: any) => (e.category === "Regalo"))

const totalExtra = regaloFiltrado ? regaloFiltrado.reduce((prev: any, actual: any) => {

   return prev + actual.amount
  }, 0):0

 const total = totalExtra

 return total
  }

  export function totalTransporte(usuario: any) {
    const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

    let extra = usuario?.extra.output?.find((e: any) => e.date === date)

    let monthly = usuario?.monthly

    const transporteExtraFiltrado = extra?.entries.filter((e: any) => e.category === "Transporte")

    const transporteMonthlyFiltrado = monthly.output.filter((e: any) => e.category === "Transporte")

    const totalExtra = transporteExtraFiltrado ? transporteExtraFiltrado.reduce((prev: any,actual: any) => {
      return prev + actual.amount
    },0):0

    const totalMonthly = transporteMonthlyFiltrado? transporteMonthlyFiltrado.reduce((prev: any, actual: any) => {
      return prev + actual.amount
    },0):0

    const total = totalExtra + totalMonthly
   
    return total
  }

  export function totalOcio(usuario: any) {

    const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

    let extra = usuario?.extra.output?.find((e:any) => e.date === date)

    const ocioExtraFiltrado = extra?.entries.filter((e: any) => e.category === "Ocio")

    const totalExtra = ocioExtraFiltrado ? ocioExtraFiltrado.reduce((prev: any, actual: any) =>{
      return prev + actual.amount
    },0):0

    const total = totalExtra

    return total;
  }

  export function totalSuper(usuario: any) {
   
    const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

    let extra = usuario?.extra.output?.find((e:any) => e.date === date)

    const superExtraFiltrado = extra?.entries.filter((e: any) => e.category === "Super")

    const totalExtra = superExtraFiltrado ? superExtraFiltrado.reduce((prev: any, actual: any) =>{
      return prev + actual.amount
    },0):0

    const total = totalExtra


    return total;
  }

  export function totalSalud(usuario: any) {
    const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

    let extra = usuario?.extra.output?.find((e: any) => e.date === date)

    let monthly = usuario?.monthly

    const saludExtraFiltrado = extra?.entries.filter((e: any) => e.category === "Salud")

    const saludMonthlyFiltrado = monthly.output.filter((e: any) => e.category === "Salud")

    const totalExtra = saludExtraFiltrado ? saludExtraFiltrado.reduce((prev: any,actual: any) => {
      return prev + actual.amount
    },0):0

    const totalMonthly = saludMonthlyFiltrado? saludMonthlyFiltrado.reduce((prev: any, actual: any) => {
      return prev + actual.amount
    },0):0

    const total = totalExtra + totalMonthly
   
    return total
  }

  export function totalAlquiler(usuario: any){

    let monthly = usuario?.monthly

    const alquilerMonthlyFiltrado = monthly.output.filter((e: any) => e.category === "Alquiler")

    const totalMonthly = alquilerMonthlyFiltrado ? alquilerMonthlyFiltrado.reduce((prev: any, actual: any) => {
      return prev + actual.amount
    },0):0
 
    const total = totalMonthly

    return total;
  }

  export function totalGimnasio(usuario: any){
    let monthly = usuario?.monthly

    const gimnasioMonthlyFiltrado = monthly.output.filter((e: any) => e.category === "Gimnasio")

    const totalMonthly = gimnasioMonthlyFiltrado ? gimnasioMonthlyFiltrado.reduce((prev: any, actual: any) => {
      return prev + actual.amount
    },0):0
 
    const total = totalMonthly
    
      return total
  }

  export function totalImpuestos(usuario: any){
    
    let monthly = usuario?.monthly

    const impuestoMonthlyFiltrado = monthly.output.filter((e: any) => e.category === "Impuestos")

    const totalMonthly = impuestoMonthlyFiltrado ? impuestoMonthlyFiltrado.reduce((prev: any, actual: any) => {
      return prev + actual.amount
    },0):0
 
    const total = totalMonthly

      return total;
  }
