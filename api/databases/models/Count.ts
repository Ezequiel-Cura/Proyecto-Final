
const CountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    countName: {type: String, require: true},
    expenses: {
        category: String,
        amount: Number
    },
    entrance: {}
},
{
    timestamps: true  // fecha de creación y de actualización
})


module.exports = CountSchema;