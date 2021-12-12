const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const User = require("../models/User")

// grabs all of the user's transactions
router.get("/", (req, res) => {
    var { email } = req.query
    Transaction.find({ email: email}, async (err, transactions) => {
        if(transactions.length == 0){
            res.send({
                success: false,
                message: "User has no transactions"
            })
        } else{
            res.send({
                success: true,
                transactions: transactions
            })
        }
    })
})

// adds new user transaction to the database
router.post("/", (req, res) => {
    var { ticker, quantity, action, price, totalPrice, dateTime, email } = req.body

    // var dateTime = Date.now()
    const transaction = new Transaction({
        ticker, quantity, action, price, totalPrice, dateTime, email
    })

    User.find({ email: email }, (err, emails) => {
        if (!emails.length) {
            res.send({
                sucess: false,
                message: "User does not exist"
            })
        } else {
            transaction.save((err) => {
                if (err) {
                    res.send({
                        sucess: false,
                        message: err
                    })
                    console.log(err)
                } else {
                    res.send({
                        sucess: true,
                        message: "Transaction successfully added"
                    })
                }
            })
        }
    })
})


module.exports = router
