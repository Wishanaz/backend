// api for follower feature

// 1. require express
const express = require("express")

//2. require userRouter
const userRouter = express.Router()

//4. require userController
const userController = require ("../controllers/user.controller")

//6. require the auth middleware
const identifyUser = require("../middlewares/auth.middleware")

//5. api create for follower
/**
 * @route POST /api/user/follow/:username
 * @description follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)


//6. api create for unfollow
/**
 * @route POST /api/user/unfollow/:username
 * @description unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

//7. api for seeing all pending req
/**
 * @route GET /api/user/follow/requests
 * @description fetches pending requests for logged-in user
 */
userRouter.get("/follow/requests", identifyUser, userController.getFollowRequestsController)

//8. api for accepting a pending req
/**
 * @route POST /api/user/follow/accept/:id
 * @description user accepts->become real follower
 */
userRouter.post("/follow/accept/:id",identifyUser, userController.acceptFollowRequestController);

//9. api for rejecting a pending req
/**
 * @route POST /api/user/follow/reject/:id
 * @description user rejects->delete the follow record
 */
userRouter.post("/follow/reject/:id",identifyUser,userController.rejectFollowRequestController)

//3. export userRouter
module.exports = userRouter