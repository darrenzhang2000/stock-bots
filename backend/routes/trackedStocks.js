const express = require("express")
const router = express.Router()
const TrackedStock = require("../models/TrackedStock")
const User = require("../models/User")


// The get request queries for the user with the current email and retrieves all of the tickers that are tracked by the trading algorithm.
router.get("/", (req, res) => {
    var { email } = req.query
    TrackedStock.find({ email: email }, async (err, trackedStocks) => {
        if (trackedStocks.length == 0) {
            res.send({
                success: false,
                message: "User has no portfolio"
            })
        } else {
            res.send({
                success: true,
                trackedStocks: trackedStocks
            })
        }
    })
})

// The post request adds the stock list to the list of stocks for the user and the delete request deletes the stock for the list of stocks.
router.post("/", (req, res) => {
    var { email, ticker } = req.body


    const trackedStock = new TrackedStock({
        email, ticker
    })

    User.find({ email: email }, (err, emails) => {
        if (!emails.length) {
            res.send({
                success: false,
                message: "User does not exist"
            })
        } else {
            trackedStock.save((err) => {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                    console.log(err)
                } else {
                    res.send({
                        success: true,
                        message: "TrackedStock successfully added"
                    })
                }
            })
        }
    })
})

router.delete("/", (req, res) => {
    var { email, ticker } = req.body

    TrackedStock.deleteOne({ email, ticker }, (err, _) => {
        if (err) {
            res.send({
                success: false,
                message: err
            })
        } else {
            res.send({
                success: true,
                message: "TrackedStock successfully added"
            })
        }
    })
})

module.exports = router