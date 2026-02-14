// ISKE ANDER HOGA REGISTER WALA API CREATE JO K EXPORT KRENGE APP.JS M

// 1. require express
const express = require("express")
// 7. require jwt
const jwt = require("jsonwebtoken")

// 4.1 require model here to create things in db
const userModel = require("../models/user.model")

// 2. create  a variable authRouter. Iski help se kahin bhi api create kr skte hain other than app.js
const authRouter = express.Router()

//4. Making api of /register with post method
authRouter.post("/register", async (req,res)=>{
    //data nikalo req.body se
    const {name,email,password} = req.body

    // 6. We dont want error 500 so:
    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            meassage:"User already existed with this email address"
        })
    }

    // 4.1 DATA IN DATABASE new user creation
    const user =  await userModel.create({
        name,email,password
    })

    // 7. TOKEN CREATE
    const token = jwt.sign({
        id : user._id,
        email : user.email
    },
    process.env.JWT_SECRET

)
// 8. cookie m store krado token ko
    res.cookie("jwt-token", token)

    //5. response
    res.status(201).json({
        message:"User registered...",
        user,
        token
    })
})

// 3. export authRouter
module.exports = authRouter

