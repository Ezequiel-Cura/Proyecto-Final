export function totalRegalo(usuario: any) {
    const extras1 = usuario.extra.input.filter(
      (e: any) => e.category === "Regalo"
    );
    const total1 = extras1.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);

    const extras2 = usuario.monthly.input.filter(
      (e: any) => e.category === "Regalo")
      
      const total2 = extras2.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0);
    const total = total1 + total2
    return total;
  }

  export function totalTransporte(usuario: any) {
    const extras1 = usuario.extra.input.filter(
      (e: any) => e.category === "Transporte"
    );
    const total1 = extras1.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);

    const extras2 = usuario.monthly.input.filter(
      (e: any) => e.category === "Transporte")
      
      const total2 = extras2.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0);

    const total = total1 + total2

    return total;
  }

  export function totalOcio(usuario: any) {
    const extras = usuario.extra.input.filter(
      (e: any) => e.category === "Ocio"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);

    return total;
  }

  export function totalAlimentos(usuario: any) {
    const extras = usuario.extra.input.filter(
      (e: any) => e.category === "Alimentos"
    );
    const total = extras.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);

    return total;
  }

  export function totalSalud(usuario: any) {
    const extras1 = usuario.extra.input.filter(
      (e: any) => e.category === "Salud"
    );
    const total1 = extras1.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);

    const extras2 = usuario.monthly.input.filter(
      (e: any) => e.category === "Salud"
    );

    const total2 = extras2.reduce((prev: any, actual: any) => {
      return prev + actual.amount;
    }, 0);

    const total = total1 + total2
     
    return total;
  }

  export function totalAlquiler(usuario: any){
    const extras = usuario.monthly.input.filter(
      (e: any) => e.category === "Alquiler")
      
      const total = extras.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0);
      return total
  }

  export function totalGimnasio(usuario: any){
    const extras = usuario.monthly.input.filter(
      (e: any) => e.category === "Gimnasio")
      
      const total = extras.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0);
      return total
  }

  export function totalOther(usuario: any){
    
    const extras2 = usuario.extra.input.filter(
      (e: any) => e.category === "Otros")
    
      const total2 = extras2.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0);
    
    
    const extras1 = usuario.monthly.input.filter(
      (e: any) => e.category === "Otros")
      
      const total1 = extras1.reduce((prev: any, actual: any) => {
        return prev + actual.amount;
      }, 0);

      const total = total1 + total2

      return total
  }
