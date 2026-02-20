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


module.exports = postRouter