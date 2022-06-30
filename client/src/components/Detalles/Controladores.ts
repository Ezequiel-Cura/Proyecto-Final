




export function totalViajes(usuario: any) {
    const extras = usuario.Account.variableExpenses.filter(
      (e: any) => e.category === "Viaje"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);
    return total;
  }

  export function totalCombustible(usuario: any) {
    const extras = usuario.Account.variableExpenses.filter(
      (e: any) => e.category === "Combustible"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);
    return total;
  }

  export function totalOcio(usuario: any) {
    const extras = usuario.Account.variableExpenses.filter(
      (e: any) => e.category === "Ocio"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);
    return total;
  }

  export function totalAlimentos(usuario: any) {
    const extras = usuario.Account.variableExpenses.filter(
      (e: any) => e.category === "Alimentos"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);
    return total;
  }

  export function totalSalud(usuario: any) {
    const extras = usuario.Account.variableExpenses.filter(
      (e: any) => e.category === "Salud"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);
    return total;
  }


  export function calculate(usuario: any) {
    const ingresos = usuario?.Account.extraInput.reduce((prev: any, actual: any) => {
      console.log(prev, actual);
      return prev + actual.amount;
    }, 0);
    const gastos = usuario?.Account.variableExpenses.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);
    const total = gastos + ingresos;
    const porcentajeGastos = Math.round((gastos * 100) / total);
    const porcentajeIngreso = 100 - porcentajeGastos;
    return { porcentajeGastos, porcentajeIngreso };
  }