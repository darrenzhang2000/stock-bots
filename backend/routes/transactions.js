const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const User = require("../models/User")

router.get("/", (req, res) => {
    var { email } = req.body

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

router.post("/", (req, res) => {
    var { ticker, quantity, action, price, totalPrice, email } = req.body

    var date = Date.now()

    const transaction = new Transaction({
        ticker, quantity, action, price, totalPrice, date, email
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