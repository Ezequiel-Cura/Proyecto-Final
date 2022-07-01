




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
