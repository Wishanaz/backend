const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
// require hash
const crypto = require("crypto")


const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body

    const isUserAlreadyExisted = await userModel.findOne({email})
    if(isUserAlreadyExisted){
        return res.status(409).json({
            message: "This email is already taken, Please use another email."
        })
    }

    // HASH PASSWORD
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =  await userModel.create({
        // db ma bhi hash password save krwao
        name,email,password : hash
    })

    const token = jwt.sign({
        id : user._id,
        email : user.email
    },
    process.env.JWT_SECRET
    )
    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"User Registered",
        user,
        token
    })

})

/**
 * /api/auth/login
 * post
 */
/**
 * controller -> woh api jispe req aey or woh call ho
 */

authRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body

    //1. check if user already exists from this email:
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message : "User not found with this email"
        })
    }

    //2. if email is correct but password is incorrect
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    //3. Now if email and password both are correct so:
    // MAKE TOKEN
    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)
    res.status(200).json({
        message:"USER LOGGED IN",
        user,
        token
    })
})

module.exports = authRouter