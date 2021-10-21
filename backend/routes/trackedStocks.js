const express = require("express")
const router = express.Router()
const TrackedStock = require("../models/TrackedStock")
const User = require("../models/User")


router.get("/", (req, res) => {
    var { email } = req.body

    TrackedStock.find({ email: email}, async (err, trackedStocks) => {
        if(trackedStocks.length == 0){
            res.send({
                success: false,
                message: "User has no portfolio"
            })
        } else{
            res.send({
                success: true,
                trackedStocks: trackedStocks
            })
        }
    })
})

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

    TrackedStock.deleteOne({ email, ticker}, (err, _) => {
        if(err){
            res.send({
                success: false,
                message: err
            }) 
        }else{
            res.send({
                success: true,
                message: "TrackedStock successfully added"
            }) 
        }
    })
})

module.exports = router