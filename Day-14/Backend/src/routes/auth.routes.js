const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")

const identifyUser = require("../middlewares/auth.middleware")

/**
 * Register
 * POST /api/auth/register
 */
authRouter.post("/register", authController.registerController)

/**
 * Login
 * POST /api/auth/login
 */
authRouter.post("/login", authController.loginController) 

/**
 * @route GET /api/auth/get-me
 * @desc get the currently logged in user's information
 * @access PRIVATE
 */
authRouter.get("/get-me", identifyUser ,authController.getMeController)

module.exports = authRouter