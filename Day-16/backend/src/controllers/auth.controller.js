const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blacklistModel = require("../models/blacklist.model")

// require redis by cache.js
const redis = require("../config/cache")

// USER REGISTER
async function registerUser(req, res){
    const {username, email, password} = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            {email}, {username}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(400).json({
            message: "user with this email or username already exists"
        })

    }

    // password hashing
    const hash = await bcrypt.hash(password,10)

    //create user
    const user = await userModel.create({
        username, email, password: hash
    })

    //create token
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET_KEY, {expiresIn: "3d"})

    // token in cookie
    res.cookie("token", token)

    return res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

//USER LOGIN
async function loginUser(req,res){
    const {email, username, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {email}, {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    //create token
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET_KEY, {expiresIn: "3d"})

    // token in cookie
    res.cookie("token", token)

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

// get my info
async function getMe(req,res){
    const user = await userModel.findById(req.user.id).select("-password")

    res.status(200).json({
        message: "user fetched successfully",
        user
    })
}

//logout 
async function logoutUser(req,res){
    // get token from cookie
    const token = req.cookies.token

    //clear token
    res.clearCookie("token")

    // blacklist token using redis
    await redis.set(token, Date.now().toString(), "EX", 60*60)

    res.status(201).json({
        message: "logged out successfully!"
    })
}

module.exports = {registerUser, loginUser, getMe, logoutUser}