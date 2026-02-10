const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI) // from .env file
        .then(()=>{
            console.log("Connected to Database...")
        })
}

module.exports = connectToDb