const {Router} = require("express")
const router = Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

// register api
router.post("/register", authController.registerUser)

//login api
router.post("/login", authController.loginUser)

//get-me api
router.get("/get-me", authMiddleware, authController.getMe)

//logout api
router.get("/logout", authController.logoutUser)

module.exports = router