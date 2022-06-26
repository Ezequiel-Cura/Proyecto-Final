'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: false, required: true },
    avatar: String,
    Accounts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Account' }]
}, {
    timestamps: true // fecha de creación y de actualización
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
