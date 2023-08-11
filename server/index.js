const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
//middleware

app.use(express.json())
app.use(cors())

//route

app.use("/auth", require("./routes/routes"))
//dash

app.use("/dashboard", require("./routes/dash"))

app.use("/admin", require("./routes/admindash"))

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})

app.use(bodyParser.json())

