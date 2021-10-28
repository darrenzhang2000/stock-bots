var mongoose = require('mongoose')

const ownedStockSchema = new mongoose.Schema({
    email: String,
    ticker: String,
    quantity: mongoose.Decimal128,
    averagePurchasePrice: mongoose.Decimal128,
})

module.exports = mongoose.model('ownedStock', ownedStockSchema)

