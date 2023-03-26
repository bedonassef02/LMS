const express = require("express")
const {login, register, index} = require("../controllers/userController");
const router = express.Router()

router.get("/",index)

router.post("/login",login)

router.post("/register",register)

module.exports = router