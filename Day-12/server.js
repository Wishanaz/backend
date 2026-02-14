// AFTETR installing npm i dotenv write:
require('dotenv').config() // config method call hone se .env k variables koa ccess kr skte hain

const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})