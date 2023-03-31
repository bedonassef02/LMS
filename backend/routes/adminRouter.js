
const express = require("express")
const router = express.Router()

var AdminController = require("../controllers/Admin/AdminController")
const adminController = new AdminController()

router.get("/",adminController.index)

router.route("/courses").get(adminController.Courses.index).post(adminController.Courses.addCourse)

router.route("/courses/:id").put(adminController.Courses.updateCourse).delete(adminController.Courses.deleteCourse).get(adminController.Courses.getCourse)

router.route("/instructors").get(adminController.Instructors.index).post(adminController.Instructors.addInstructor)

router.route("/instructors/:id").put(adminController.Instructors.updateInstructor).delete(adminController.Instructors.deleteInstructor).get(adminController.Instructors.getInstructor)

router.post("/assignInstructorToCourse",adminController.Instructors.assignToCourse)

module.exports = router