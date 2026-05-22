const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const redis = require("../config/cache")

// AUTH MIDDLEWARE
async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token is missing"
        })
    }

    const isTokenBlacklisted = await redis.get(token)
    if(isTokenBlaclisted){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    try{
        let decoded = jwt.verify(
            token, process.env.JWT_SECRET_KEY
        )

        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = authUser