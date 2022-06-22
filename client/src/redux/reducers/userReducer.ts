import { createSlice } from "@reduxjs/toolkit"

interface User {
  // Mock OBJ
  usuario: object
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: User = {
  usuario: {},

  status: 'idle'
}

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadMockUser: (state) => {
      state.usuario = {
        // Mock OBJ
        id: '9vd8jq9834h91278gh1ufhv',
        nombre: 'Erik',
        apellido: 'Van den Bosch Vidal',
        email: 'email@email.com',

        cuenta: {
          '01-22': {
            Total: 36500,
            Ingresos: 60000,
            Ahorro: 0,
            Rubros: {
              Alimento: {
                Tipo: 'Variable',
                total: 6500, //suma de todas las entradas
                Entradas: {
                  1: 1500,
                  6: 2000,
                  13: 3000,
                }
              },
              Servicios: {
                Tipo: 'Estatico',
                valorMensual: 30000
              }
            }
          }
        }
      }
    }
  }
})


export default reducerSlice.reducer