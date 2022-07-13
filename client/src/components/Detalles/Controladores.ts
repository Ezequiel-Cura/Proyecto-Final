

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




  // FUNCIONES PARA EL BAR CHART 
//2022-07
  export function calcularInputsPorMes(usuario:any,year:any){
    // LA IDEA PARA CUANDO CAMBIES DE AÑO 
    // DENTRO DEL INCLUDES EL AÑO SEA UNA VARIABLE QUE VIENE DE UN SELECT Y QUE CAMBIE SEGUN EL AÑO
    // const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

    // const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`
    // console.log("==================================")
    let Enero = usuario.monthly.input.filter((e:any)=>e.date.includes(year +"-01"))
    let EneroExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-01"))? usuario.extra.input.find((e:any)=>e.date.includes(year+"-01")).entries : null
    if(EneroExtra !== null) Enero = Enero.concat(EneroExtra) 
    Enero = Enero.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0) 
    // console.log("Enero",Enero)                                                     

    let Febrero = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-02"))
    let FebreroExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-02"))? usuario.extra.input.find((e:any)=>e.date.includes(year+"-02"))?.entries : null
    if(FebreroExtra !== null) Febrero = Febrero.concat(FebreroExtra)
    Febrero = Febrero.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Febrero",Febrero)

    let Marzo = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-03"))
    let MarzoExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-03")) ? usuario.extra.input.find((e:any)=>e.date.includes(year+"-03"))?.entries : null
    if(MarzoExtra !== null)Marzo = Marzo.concat(MarzoExtra)
    Marzo = Marzo.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Marzo",Marzo)

    let Abril = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-04"))
    let AbrilExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-04"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-04"))?.entries:null
    if(AbrilExtra !== null)Abril = Abril.concat(AbrilExtra)
    Abril = Abril.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Abril",Abril)

    let Mayo = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-05"))
    let MayoExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-05"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-05"))?.entries:null
    if(MayoExtra !== null)Mayo = Mayo.concat(MayoExtra)
    Mayo = Mayo.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Mayo",Mayo)

    let Junio = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-06"))
    let JunioExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-06"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-06"))?.entries:null
    if(JunioExtra !== null)Junio = Junio.concat(JunioExtra)
    Junio = Junio.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Junio",Junio)

    let Julio = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-07"))
    let JulioExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-07"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-07"))?.entries : null
    if(JulioExtra !== null)Julio = Julio.concat(JulioExtra)
    Julio = Julio.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Julio",Julio)

    let Agosto = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-08"))
    let AgostoExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-08"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-08"))?.entries: null
    if(AgostoExtra !== null)Agosto = Agosto.concat(AgostoExtra)
    Agosto = Agosto.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Agosto",Agosto)

    let Septiembre = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-09"))
    let SeptiembreExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-09"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-09"))?.entries:null
    if(SeptiembreExtra!== null)Septiembre = Septiembre.concat(SeptiembreExtra)
    Septiembre = Septiembre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Septiembre",Septiembre)

    let Octubre = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-10"))
    let OctubreExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-10"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-10"))?.entries : null
    if(OctubreExtra !== null)Octubre = Octubre.concat(OctubreExtra)
    Octubre = Octubre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Octubre",Octubre)

    let Noviembre = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-11"))
    let NoviembreExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-11"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-11"))?.entries:null
    if(NoviembreExtra !== null)Noviembre = Noviembre.concat(NoviembreExtra)
    Noviembre = Noviembre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Noviembre",Noviembre)

    let Diciembre = usuario.monthly.input.filter((e:any)=>e.date.includes(year+"-12"))
    let DiciembreExtra = usuario.extra.input.find((e:any)=>e.date.includes(year+"-12"))?usuario.extra.input.find((e:any)=>e.date.includes(year+"-12"))?.entries:null
    if(DiciembreExtra !== null)Diciembre = Diciembre.concat(DiciembreExtra)
    Diciembre = Diciembre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Diciembre",Diciembre)

    return [Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre]
  }


  export function calcularOutputsPorMes(usuario:any,year:any){
    // const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    // const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`

    
    // console.log("==================================")
    let Enero = usuario.monthly.output.filter((e:any)=>e.date.includes(year + "-01"))
    let EneroExtra = usuario.extra.output.find((e:any)=>e.date.includes(year + "-01"))? usuario.extra.output.find((e:any)=>e.date.includes(year+"-01")).entries : null
    if(EneroExtra !== null) Enero = Enero.concat(EneroExtra) 
    Enero = Enero.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0) 
    // console.log("Enero",Enero)                                                     

    let Febrero = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-02"))
    let FebreroExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-02"))? usuario.extra.output.find((e:any)=>e.date.includes(year+"-02"))?.entries : null
    if(FebreroExtra !== null) Febrero = Febrero.concat(FebreroExtra)
    Febrero = Febrero.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Febrero",Febrero)

    let Marzo = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-03"))
    let MarzoExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-03")) ? usuario.extra.output.find((e:any)=>e.date.includes(year+"-03"))?.entries : null
    if(MarzoExtra !== null)Marzo = Marzo.concat(MarzoExtra)
    Marzo = Marzo.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Marzo",Marzo)

    let Abril = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-04"))
    let AbrilExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-04"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-04"))?.entries:null
    if(AbrilExtra !== null)Abril = Abril.concat(AbrilExtra)
    Abril = Abril.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Abril",Abril)

    let Mayo = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-05"))
    let MayoExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-05"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-05"))?.entries:null
    if(MayoExtra !== null)Mayo = Mayo.concat(MayoExtra)
    Mayo = Mayo.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Mayo",Mayo)

    let Junio = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-06"))
    let JunioExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-06"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-06"))?.entries:null
    if(JunioExtra !== null)Junio = Junio.concat(JunioExtra)
    Junio = Junio.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Junio",Junio)

    let Julio = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-07"))
    let JulioExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-07"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-07"))?.entries : null
    if(JulioExtra !== null)Julio = Julio.concat(JulioExtra)
    Julio = Julio.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Julio",Julio)

    let Agosto = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-08"))
    let AgostoExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-08"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-08"))?.entries: null
    if(AgostoExtra !== null)Agosto = Agosto.concat(AgostoExtra)
    Agosto = Agosto.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Agosto",Agosto)

    let Septiembre = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-09"))
    let SeptiembreExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-09"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-09"))?.entries:null
    if(SeptiembreExtra!== null)Septiembre = Septiembre.concat(SeptiembreExtra)
    Septiembre = Septiembre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Septiembre",Septiembre)

    let Octubre = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-10"))
    let OctubreExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-10"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-10"))?.entries : null
    if(OctubreExtra !== null)Octubre = Octubre.concat(OctubreExtra)
    Octubre = Octubre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Octubre",Octubre)

    let Noviembre = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-11"))
    let NoviembreExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-11"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-11"))?.entries:null
    if(NoviembreExtra !== null)Noviembre = Noviembre.concat(NoviembreExtra)
    Noviembre = Noviembre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Noviembre",Noviembre)

    let Diciembre = usuario.monthly.output.filter((e:any)=>e.date.includes(year+"-12"))
    let DiciembreExtra = usuario.extra.output.find((e:any)=>e.date.includes(year+"-12"))?usuario.extra.output.find((e:any)=>e.date.includes(year+"-12"))?.entries:null
    if(DiciembreExtra !== null)Diciembre = Diciembre.concat(DiciembreExtra)
    Diciembre = Diciembre.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0)
    // console.log("Diciembre",Diciembre)

    return [Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre]
  } 