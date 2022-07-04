'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    avatar: String,
    premium: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
    savings: [{
            name: { type: String, required: true },
            start: { type: Date, required: true, default: Date.now() },
            end: Date,
            goal: Number,
            currentAmount: Number,
            depositPlace: String,
            currency: { type: String, required: true, default: "Peso Argentino" },
        }],
    fees: [{
            start: Date,
            end: Date,
            name: String,
            category: String,
            amount: Number,
        }],
    monthly: {
        input: [{
                date: { type: String, required: true },
                end: Date,
                description: String,
                category: String,
                amount: Number,
            }],
        output: [{
                start: Date,
                end: Date,
                description: String,
                category: String,
                amount: Number,
            }]
    },
    extra: {
        input: [{
                date: String,
                entries: [{
                        date: { type: Date, default: Date.now() },
                        description: String,
                        category: String,
                        amount: Number,
                    }]
            }],
        output: [{
                date: String,
                entries: [{
                        date: { type: Date, default: Date.now() },
                        description: String,
                        category: String,
                        amount: Number,
                    }]
            }],
    },
    categories: [{
            name: String,
            frequency: {
                type: String,
                enum: ['monthly', 'extra'],
                required: true
            },
            type: {
                type: String,
                enum: ['input', 'output'],
                required: true
            }
        }]
});
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token;
};
exports.default = (0, mongoose_1.model)('user', userSchema);
