require("dotenv").config()

// index.js
// where your node app starts

// init project
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/api", (req, res) => {
  const date = new Date()

  const unix = date.getTime()
  const utc = date.toUTCString()

  res.json({ unix, utc })
})

app.get("/api/:date", (req, res) => {
  let date
  let param = req.params.date

  // console.log({ param })

  // Handle numeric date (unix timestamp)
  if (!!Number(param)) {
    // console.log("param is numeric", Number(param))
    param = Number(param)
  }

  date = new Date(param)

  // Handle invalid date
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" })
    return
  }

  const unix = date.getTime()
  const utc = date.toUTCString()

  res.json({ unix, utc })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
