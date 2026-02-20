const postModel = require("../models/post.models")

const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')

const jwt = require("jsonwebtoken")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    // console.log(req.body, req.file)

    const token = req.cookies.token
    // if a user dont have that token it means he hasent logged in or registered
    if(!token){
        return res.status(401).json({
            message:"Token not provided, Unauthorised access"
        })
    }

    console.log("token", token)

    // if user has a token then we need its user id to create a post, and we can get that from cookies
    // handle it with try and catch becoz if token is tempered so catch will handle the error
    let decoded = null
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.sttus(401).json({
            message:"user not authorized"
        })
    }
    console.log(decoded)
    

    //image-kit code
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: 'Cohort-2-insta-clone-posts'
    })
    
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}

module.exports = {createPostController}