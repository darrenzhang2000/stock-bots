const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const path = require('path')

// parse application/x-www-form-encoded and application/json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//allow cors
var cors = require('cors')
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => console.log("listening at port", port))
