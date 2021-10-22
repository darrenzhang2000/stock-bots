const express = require("express")
const router = express.Router()
const OwnedStock = require("../models/OwnedStock")
const User = require("../models/User")


router.get("/", (req, res) => {
    var { email } = req.body

    OwnedStock.find({ email: email}, async (err, ownedStocks) => {
        if(ownedStocks.length == 0){
            res.send({
                success: false,
                message: "User has no stocks"
            })
        } else{
            res.send({
                success: true,
                ownedStocks: ownedStocks
            })
        }
    })
})

router.put("/", (req, res) => {
    var { email, ticker, quantity } = req.body

    const ownedStock = new OwnedStock({
        email, ticker, quantity
    })

    User.find({ email: email }, (err, emails) => {
        if (!emails.length) {
            res.send({
                success: false,
                message: "User does not exist"
            })
        } else {
            ownedStock.save((err) => {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                    console.log(err)
                } else {
                    res.send({
                        success: true,
                        message: "OwnedStock successfully modified"
                    })
                }
            })
        }
    })
})

router.post("/", (req, res) => {
    var { email, ticker, quantity } = req.body

    const ownedStock = new OwnedStock({
        email, ticker, quantity
    })

    User.find({ email: email }, (err, emails) => {
        if (!emails.length) {
            res.send({
                success: false,
                message: "User does not exist"
            })
        } else {
            ownedStock.save((err) => {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
                    console.log(err)
                } else {
                    res.send({
                        success: true,
                        message: "OwnedStock successfully added"
                    })
                }
            })
        }
    })
})

router.delete("/", (req, res) => {
    var { email, ticker } = req.body

    OwnedStock.deleteOne({ email, ticker}, (err, _) => {
        if(err){
            res.send({
                success: false,
                message: err
            }) 
        }else{
            res.send({
                success: true,
                message: "OwnedStock successfully deleted"
            }) 
        }
    })
})

module.exports = router