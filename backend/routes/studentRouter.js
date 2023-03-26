const express = require("express")
const {getStudent, showCourses, registerCourse} = require("../controllers/studentController");
const router = express.Router()

router.get("/",getStudent)

router.get("/courses",showCourses)

router.post("/courses",registerCourse)

module.exports = router