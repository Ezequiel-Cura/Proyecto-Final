'use strict'
import { Schema, model } from "mongoose"

interface IMoney{
    category: string,
    amount: number
}
interface IAccount {
 _id?: string,
 name: string,
 expenses?: IMoney[],
 entrance?: IMoney[]
}

const AccountSchema = new Schema<IAccount>({
    name: {type: String, required: true},
    expenses: [{
        category: { type: Schema.Types.ObjectId, ref: 'Category'},
        amount: Number
    }],
    entrance: [{
        category: { type: Schema.Types.ObjectId, ref: 'Category'},
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
