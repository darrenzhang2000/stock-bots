var mongoose = require('mongoose')

const trackedStockSchema = new mongoose.Schema({
    email: String,
    ticker: String
})

module.exports = mongoose.model('TrackedStock', trackedStockSchema)

