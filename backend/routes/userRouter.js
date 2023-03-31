const express = require("express")
const router = express.Router()

var UserController = require("../controllers/User/UserController")
const userController = new UserController();
var ValidateToken = require("../middleware/ValidateToken")
const validateToken = new ValidateToken();

router.get("/", userController.index)

router.post("/login", userController.login)

router.post("/register", userController.register)

router.post("/profiles/:id/password/change", validateToken.validateUserToken, userController.changePassword)

router.get("/profiles/:id", validateToken.validateUserToken, userController.profileInfo)

module.exports = router