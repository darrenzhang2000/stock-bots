const { response } = require("express")
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
    Portfolio.findOneAndUpdate({email: email}, 
        {$inc:{spendingPower: amount}}, (error, response) => {
            if(error){
                response.send(
                    {
                        success: false, 
                        message: error
                    }
                )
            }
            else{
                response.send(
                    {
                        success: true,
                        message: "Succesfully updated DataBase",
                        spendingPower: response.spendingPower
                    }
                )
            }
        })
})

module.exports = router