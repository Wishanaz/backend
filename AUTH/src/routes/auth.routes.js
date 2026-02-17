const express = require("express")
const userModel = require("../models/user.models")
const crypto = require("crypto")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")

authRouter.post("/register" , async(req,res)=>{
    const {name, email, password} = req.body
    const isUserExists = await userModel.findOne({email})

    if (isUserExists){
        return res.status(409).json({
            message:"User Already Exixts."
        })
    }

    const user = await userModel.create({
        name,
        email,
        password : crypto.createHash('sha256').update(password).digest("hex")
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,{expiresIn: "1h"})

    res.cookie("token", token)

    res.status(201).json({
        message:"User Registered",
        user
    })
    
})

authRouter.get("/get-me", async(req,res)=>{
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)
    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body

    // check if email exixts or not
    const user = await userModel.findOne({email})
    if (!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    //check for the valid password
    const hashedPassword = crypto.createHash('sha256').update(password).digest("hex")
    if(hashedPassword !== user.password){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    //create new token if email and password is valid
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )

    res.cookie("token", token)
    res.json({
        message:"Login Successfull",
        user
    })
})

module.exports = authRouter