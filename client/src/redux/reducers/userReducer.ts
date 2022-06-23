import { createSlice } from "@reduxjs/toolkit"

interface User {
  // Mock OBJ
  usuario: object
  status: 'idle' | 'loading' | 'success' | 'failed'
}



const initialState: User = {
  usuario: {
    // id: '9vd8jq9834h91278gh1ufhv',
    // nombre: 'Nombre',
    // apellido: 'Apellido',
    // email: 'email@email.com',
    // contraseña: '24958v19er84y9w8345g412895g1',
    // avatar: 'https://png.pngtree.com/png-vector/20210604/ourlarge/pngtree-gray-avatar-placeholder-png-image_3416697.jpg',

    // cuenta:[
    //   {
    //     accountName: 'Account1',
    //     expenses: [
    //       {category: 'Alimento',
    //         ammount: 2000},
            
    //       {category: 'Luz',
    //         ammount: 3000}
    //     ],
    //     entrance: [
    //       {category: 'Herencia',
    //         ammount: 10000},

    //       {category: 'Seguro',
    //         ammount: 150000}
    //     ]
    //   }
    // ]
  },  
  status: 'idle'
}

const reducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadMockUser: (state) => {
      state.usuario = {
        id: '9vd8jq9834h91278gh1ufhv',
        nombre: 'Nombre',
        apellido: 'Apellido',
        email: 'email@email.com',
        contraseña: '24958v19er84y9w8345g412895g1',
        avatar: 'https://png.pngtree.com/png-vector/20210604/ourlarge/pngtree-gray-avatar-placeholder-png-image_3416697.jpg',
    
        cuenta:[
          {
            accountName: 'Account1',
            expenses: [
              {category: 'Alimento',
                ammount: 2000},

              {category: 'Luz',
                ammount: 3000}
            ],
            entrance: [
              {category: 'Herencia',
                ammount: 10000},
                
              {category: 'Seguro',
                ammount: 150000}
            ]
          }
        ]
      }
      
    }
  }
})

export const {loadMockUser} = reducerSlice.actions
export default reducerSlice.reducer