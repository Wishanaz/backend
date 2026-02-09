/* server start krna */

const app = require('./src/app')
require('dotenv').config()
const mongoose = require("mongoose")
const uri = process.env.MONGO_URI
function connectToDb(){
    mongoose.connect(uri)
        .then(()=>{
            console.log("MongoDB connected")
        })
}
connectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})