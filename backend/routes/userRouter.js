const express = require("express")
const {login, register, index, changePassword, changeEmail} = require("../controllers/userController");
const router = express.Router()
const validateUserToken = require("../middleware/validateTokenHandler")

router.get("/",index)

router.post("/login",login)

router.post("/register",register)

router.post("/profile/:id/password/change",validateUserToken,changePassword)
router.post("/profile/:id/email/change",validateUserToken,changeEmail)

module.exports = router