'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSQLessSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, lowercase: true, required: true },
    avatar: String,
    Account: {
        monthlyInput: [{
                name: String,
                category: String,
                amount: Number
            }],
        extraInput: [{
                name: String,
                category: String,
                amount: Number
            }],
        monthlyExpenses: [{
                name: String,
                amount: Number,
                createdAt: Date,
                end: String
            }],
        variableExpenses: [{
                date: String,
                entries: [
                    {
                        id: mongoose_1.Schema.Types.ObjectId,
                        name: String,
                        category: String,
                        amount: Number
                    }
                ]
            }]
    }
});
exports.default = (0, mongoose_1.model)('UserNoSql-temp', UserSQLessSchema);
