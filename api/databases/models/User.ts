import { Schema, model } from "mongoose"
'use strict'

interface IUser{
    _id?: string,
    userName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    avatar?: string,
    Accounts?: any
}

const UserSchema = new Schema<IUser>({
    userName: {type: String, required: true},
    lastName: String,
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, select: false, required: true}, //con select evitamos que envie esa info del usuario
    avatar: String,
    Accounts: [{ type: Schema.Types.ObjectId, ref: 'Account'}]
},
{
    timestamps: true  // fecha de creación y de actualización
})

export default model<IUser>('User', UserSchema);

