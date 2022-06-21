const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: {type: String, required: true},
    lastName: String,
    email: {type: String, unique: true, lowercase: true},
    password: {type: String, select: false}, //con select evitamos que envie esa info del usuario
    avatar: String,
    Accounts: [{ type: Schema.Types.ObjectId, refs: 'Account'}]
},
{
    timestamps: true  // fecha de creación y de actualización
})


module.exports = UserSchema

