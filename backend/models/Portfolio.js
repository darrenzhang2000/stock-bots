var mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    email: String,
    total: mongoose.Decimal128,
    spendingPower: Number
})

module.exports = mongoose.model('Portfolio', portfolioSchema)

