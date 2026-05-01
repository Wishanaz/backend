const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer  = require('multer')
const upload = multer({storage:multer.memoryStorage()}) // for storing file in memory as buffer

const identifyUser = require("../middlewares/auth.middleware")

/**
 * @routes POST /api/post/   [protected]-> valid token user can post only otherwise 401(unauthorise access)
 * @description create a post by user with content and image and store in database
 * req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"), identifyUser,postController.createPostController  )

/**
 * @routes GET /api/post/
 * @description get all the posts of that particular user requesting it.
 */
postRouter.get("/", identifyUser ,postController.getPostController)


/**
 * @routes GET /api/post/details:postid
 * @description return detail about specific post and also checks if that post is made by that user 
 */

postRouter.get("/details/:postId",identifyUser ,postController.getPostDetailsController)


/**
 * @route POST /api/post/like/:postid
 * @description like a post with the id given in the params
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)


/**
 * @route /api/post/feed
 * @desc get all the posts created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController)


module.exports = postRouter