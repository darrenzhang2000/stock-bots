const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
require('dotenv').config()



// parse application/x-www-form-encoded and application/json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//allow cors
var cors = require('cors')
app.use(cors())

//connect to mongoose
const mongoose = require("mongoose")
mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true }
)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("connected to db")
})

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => console.log("listening at port", port))
