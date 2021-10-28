const express = require("express")
const router = express.Router()
const Portfolio = require("../models/Portfolio")
const User = require("../models/User")

router.get("/hi", (req, res) => { res.send("hi") })

router.get("/", (req, res) => {
    var { email } = req.query

    Portfolio.find({ email: email }, async (err, portfolios) => {
        if (portfolios.length == 0) {
            res.send({
                success: false,
                message: "User has no portfolio"
            })
        } else {
            res.send({
                success: true,
                portfolios: portfolios
            })
        }
    })
})

router.post("/", (req, res) => {
    var { email, total, spendingPower } = req.body

    const portfolio = new Portfolio({
        email, total, spendingPower
    })

    User.find({ email: email }, (err, emails) => {
        if (!emails.length) {
            res.send({
                sucess: false,
                message: "User does not exist"
            })
        } else {
            portfolio.save((err) => {
                if (err) {
                    res.send({
                        sucess: false,
                        message: err
                    })
                    console.log(err)
                } else {
                    res.send({
                        sucess: true,
                        message: "Portfolio successfully added"
                    })
                }
            })
        }
    })
})

router.put("/", (req, res) => {
    var { email, amount } = req.body
    console.log(amount, typeof(amount))
    console.log(req)

    Portfolio.findOneAndUpdate({ email: email },
        {
            $inc: {
                spendingPower: amount
            }
        },
        (err, response) => {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                res.send({
                    success: true,
                    spendingPower: response.spendingPower
                })
            }
        }
    )
})


module.exports = router