const postModel = require("../models/post.models");


const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const likeModel = require("../models/like.model")

/**
 * creating post logic
 */
async function createPostController(req, res) {
  // console.log(req.body, req.file)


  //image-kit code
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

/**
 * getting all posts logic
 */
async function getPostController(req,res){
  

  // Return all those posts which have userId of that particular user requesting
  const userId = req.user.id
  const posts = await postModel.find({
    user: userId
  })
  
  res.status(200).json({
    message:"Post Fetched!",
    posts
  })

}

/**
 * getting post details logic
 */
async function getPostDetailsController(req,res){
  

  const userId = req.user.id
  const postId = req.params.postId

  // post fetch
  const post = await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
      message:"Post not found."
    })
  }

  // to check post wala user or req wala user donbo same h k ni
  const isValidUser = post.user.toString() === userId

  //agr dono same ni hue to return kar jao
  if(!isValidUser){
    return res.status(403).json({
      message:"Forbidden Content"
    })
  }
 
  //ab dono match kr jaen to return response
  return res.status(200).json({
    message: "Post fetched successfully!",
    post
  })
}

/**
 * like post controller
 */
async function likePostController(req,res){

  //1. konsa user like kr rha h
  const username = req.user.username
  //2. konsa post like krna h
  const postId = req.params.postId

  //3. check: if post exists?
  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message: "post not found"
    })
  }

  const like = await likeModel.create({
    post: postId,
    user: username
  })

  res.status(200).json({
    message:"post liked successfully",
    like
  })

}

/**
 * get all posts and show in the feed
 */
async function getFeedController(req,res){

  const user = req.user

  // get all post + user detail also
  const posts = await Promise.all((await postModel.find().populate("user").lean())
  .map( async(post)=>{
    /**
     * type of psot is mongoose obj
     * lean makes them as a normal obj and new properties can be created
     */
    const isLiked = await likeModel.findOne({
      user: user.username,
      post: post._id
    })
    post.isLiked = Boolean(isLiked) //!!isLiked means if isLiked is null then false and if it has some value then true
    return post
  }))

  res.status(200).json({
    message:"posts fetched successfully!",
    posts
  })

}

module.exports = { createPostController, getPostController, getPostDetailsController, likePostController, getFeedController };
