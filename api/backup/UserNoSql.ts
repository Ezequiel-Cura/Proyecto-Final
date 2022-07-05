
'use strict'
import { Schema, model } from "mongoose"

interface IMoney {
    category: string,
    amount: number
}
interface IAccount {
    name?: string,
    expenses?: IMoney[],
    entrance?: IMoney[]
}
interface IUser {
    _id?: string,
    userName: string,
    lastName?: string,
    email: string,
    password: string,
    avatar?: string,
    Account?: IAccount
}

const UserNoSqlSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: false, required: true }, //con select evitamos que envie esa info del usuario
    avatar: String,
    Account: {
        name: { type: String},
        expenses: [{
            category: { type: Schema.Types.ObjectId, ref: 'Category' },
            amount: Number
        }],
        entrance: [{
            category: { type: Schema.Types.ObjectId, ref: 'Category' },
            amount: Number
        }]
    },
},
    {
        timestamps: true  // fecha de creación y de actualización
    })

export default model<IUser>('UserNoSql', UserNoSqlSchema);