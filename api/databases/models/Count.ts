
const CountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    countName: {type: String, require: true},
    expenses: {
        category: {type: String, require: true},
        amount: Number
    },
    entrance: {
        category: {type: String, require: true},
        amount: Number
    }
},
{
    timestamps: true  // fecha de creación y de actualización
})


module.exports = CountSchema;