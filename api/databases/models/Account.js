'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    expenses: [{
            category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
            amount: Number
        }],
    entrance: [{
            category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
            amount: Number
        }],
}, {
    timestamps: true // fecha de creación y de actualización
});
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
exports.default = (0, mongoose_1.model)('Account', AccountSchema);
