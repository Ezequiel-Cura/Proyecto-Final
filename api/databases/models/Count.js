"use strict";
const AcountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    AcountName: { type: String, required: true },
    expenses: {
        category: { type: String, required: true },
        amount: Number
    },
    entrance: {
        category: { type: String, required: true },
        amount: Number
    }
}, {
    timestamps: true // fecha de creación y de actualización
});
module.exports = AcountSchema;
