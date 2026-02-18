const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        unique:[true,"username already exists"],
        required: true
    },
    email:{
        type:String,
        unique:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/y81pb6k3y/default-user.png"
    }
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel