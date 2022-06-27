'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserNoSqlSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: false, required: true },
    avatar: String,
    Account: {
        name: { type: String },
        expenses: [{
                category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
                amount: Number
            }],
        entrance: [{
                category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
                amount: Number
            }]
    },
}, {
    timestamps: true // fecha de creación y de actualización
});
exports.default = (0, mongoose_1.model)('UserNoSql', UserNoSqlSchema);
