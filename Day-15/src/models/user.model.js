const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exists"],
        required:true
    },
    email:{
        type:String,
        unique:[true, "Email already exists"],
        required: [ true, "Email is required" ]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    bio: String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/gstnkqhsg/default-profile-img.webp"
    },
    isPrivate:{
        type:Boolean,
        default: false
    }
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

module.exports = userModel