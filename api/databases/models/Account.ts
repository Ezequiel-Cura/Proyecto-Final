import { Schema, model } from "mongoose"
'use strict'

interface IMoney{
    category: string,
    amount: number
}
interface IAccount {
 _id?: string,
 AccountName: string,
 expenses?: IMoney[],
 entrance?: IMoney[]
}

const AccountSchema = new Schema<IAccount>({
    AccountName: {type: String, required: true},
    expenses: [{
        category: {type: String, required: true},
        amount: Number
    }],
    entrance: [{
        category: {type: String, required: true},
        amount: Number
    }],
},
{
    timestamps: true  // fecha de creación y de actualización
})
// timestamps crea dos props: createdAt y la otra UpdateAt
// routas get y necesita de req.body el año o mes que precisa
// filter(account => account.createdAt.split("-")[0] === year)
// filter(account => account.createdAt.split("-")[1] === month)
// cuenta1{
//     id,
//     name: cuentaFija,
//     gastos{
    // categoria: psicologo,
    // amount: 2000  
//     }
//     ingresos:{
    // categoria: herencia,
    // amount: 100000
// }
// }

export default model<IAccount>('Account', AccountSchema);
