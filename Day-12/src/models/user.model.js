const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    // modify email so that no moer than 1 user can be created with the same email
    email:{
        type:String,
        unique:[true,"With this email user account already existed."]
    },
    password:String,
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
