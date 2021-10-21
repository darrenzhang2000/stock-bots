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
                sucess: false,
                message: "User does not exist"
            })
        } else {
            trackedStock.save((err) => {
                if (err) {
                    res.send({
                        sucess: false,
                        message: err
                    })
                    console.log(err)
                } else {
                    res.send({
                        sucess: true,
                        message: "TrackedStock successfully added"
                    })
                }
            })
        }
    })
})


module.exports = router