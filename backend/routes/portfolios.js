const express = require("express")
const router = express.Router()
const Portfolio = require("../models/Portfolio")
const User = require("../models/User")

router.get("/hi", (req, res) => {res.send("hi") })

router.get("/", (req, res) => {
    var { email } = req.body

    Portfolio.find({ email: email}, async (err, portfolios) => {
        if(portfolios.length == 0){
            res.send({
                success: false,
                message: "User has no portfolio"
            })
        } else{
            res.send({
                success: true,
                portfolios: portfolios
            })
        }
    })
})

router.post("/", (req, res) => {
    var { email, total } = req.body


    const portfolio = new Portfolio({
        email, total
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


module.exports = router