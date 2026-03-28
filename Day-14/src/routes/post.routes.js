const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer  = require('multer')
const upload = multer({storage:multer.memoryStorage()}) // for storing file in memory as buffer


/**
 * POST /api/post/   [protected]-> valid token user can post only otherwise 401(unauthorise access)
 * req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"),postController.createPostController  )

/**
 * GET /api/post/
 * get all the posts of that particular user requesting it.
 */
postRouter.get("/", postController.getPostController)


/**
 * GET /api/post/details:postid
 * return detail about specific post and also checks if that post is made by that user 
 */

postRouter.get("/details:postid", postController.getPostDetailsController)

module.exports = postRouter