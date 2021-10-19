var mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    ticker: String,
    quantity: Number,
    action: String,
    price: mongoose.Decimal128,
    totalPrice: mongoose.Decimal128,
    dataTime: Date,
    email: String
})

module.exports = mongoose.model('Transaction', transactionSchema)

