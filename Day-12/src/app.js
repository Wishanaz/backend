const express = require("express")
// require authRouter
const authRouter = require("./routes/auth.routes")
// require cookie parser
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
// add middlewhere cookie parser
app.use(cookieParser())

// write prefix for /register
app.use("/api/auth", authRouter)


module.exports = app