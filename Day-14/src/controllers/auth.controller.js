const userModel = require("../models/user.models")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const {email,username,bio,password,profileImage} = req.body

    // Check email and username if user exists in one go.
    const isUserExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserExists){
        return res.status(409).json({
            message:"User already exists " +
            (isUserExists.email === email ? "Email is already taken" : "Username is already taken")
            
        })
    }

    //Paword hashing
    const hashPassword =  crypto.createHash("sha256").update(password).digest("hex")

    // store that password in database
    const user = await userModel.create({
        email,
        username,
        bio,
        password:hashPassword,
        profileImage
    })

    //create token
    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_sECRET,
    {expiresIn:"1d"})

    //save in cookie
    res.cookie("token", token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req,res){
    const {email, username, password} = req.body

    // checking if user exists on the basis of usename or email
    const user = await userModel.findOne({
        $or:[
            {
                // condition1
                username: username
            },
            {
                // condition2
                email:email
            }
        ]
    })

    // check if both are not in db so it means user not found
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    // Check if we found user so its password is valid or not
    // 1st convert it into hash for comparision

    const hashPassword = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hashPassword == user.password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    //IF password is correct so create token
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}