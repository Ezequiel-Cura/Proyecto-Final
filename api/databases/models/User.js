'use strict';
const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: false, required: true },
    avatar: String,
    Accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
}, {
    timestamps: true // fecha de creación y de actualización
});
module.exports = UserSchema;
