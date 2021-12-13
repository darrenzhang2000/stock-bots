const express = require("express")
const router = express.Router()
const OwnedStock = require("../models/OwnedStock")
const User = require("../models/User")
const { route } = require("./transactions")




//  The get request queries the OwnedStock in the database 
// to get all of the stocks owned by the user with the specified 
// email. 
router.get("/", (req, res) => {
    var { email } = req.query
    OwnedStock.find({ email: email}, async (err, ownedStocks) => {
        // If the user isn’t found, then the success: false is 
        // passed back as the json response along with the error 
        // message. Otherwise, the ownedStock document is saved
        // into the database and a success message is sent.
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

// modifies an existing stock in the db
router.put("/", (req, res) => {
    var { email, ticker, quantity, averagePurchasePrice } = req.body

    const ownedStock = new OwnedStock({
        email, ticker, quantity, averagePurchasePrice
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

// adds a new stock to the db
router.post("/", (req, res) => {
    var { email, ticker, quantity, averagePurchasePrice } = req.body

    const ownedStock = new OwnedStock({
        email, ticker, quantity, averagePurchasePrice
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

// The delete request removes the ownedStock from the database.
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

// buy or sell a stock. positive purchaseAmt for buy, negative for sell
router.put('/purchase', (req, res) => {
    var { email, ticker, purchaseAmt } = req.body
 
    const filter = {
        ticker: ticker,
        email: email
    }
    const update = {
        $inc: { quantity: purchaseAmt}
    }
    OwnedStock.findOneAndUpdate(filter, update, (err, stock) => {
        if(err){
            res.send({
                success: false,
                message: err
            })
        }else{
            res.send({
                success: true,
                message: "successfully updated",
                data: stock
            })
        }
    })
})


module.exports = router
