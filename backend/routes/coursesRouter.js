
const express = require("express")
const router = express.Router()

var ValidateToken = require("../middleware/ValidateToken")
const validateToken = new ValidateToken();
var CoursesController = require("../controllers/Courses/CoursesController")
const coursesController = new CoursesController()

var AdminController = require("../controllers/Admin/AdminController")
const adminController = new AdminController()

router.post('/:id/register',validateToken.validateStudentToken,coursesController.register)
router.get("/",adminController.Courses.index)
router.get("/:id",adminController.Courses.getCourse)

module.exports = router