'use strict'
interface IUser{
    _id: string,
    userName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string,
    Accounts: any
}

const UserSchema: IUser = new Schema({
    _id: Schema.Types.ObjectId,
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


module.exports = UserSchema

