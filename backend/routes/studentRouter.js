const express = require("express")
const router = express.Router()

var StudentController = require("../controllers/Student/StudentController")
const studentController = new StudentController()


router.route("/:id").get(studentController.index)
router.get("/:id/courses", studentController.showCourses)

// router.route("/courses/:id").put(adminController.Courses.updateCourse).delete(adminController.Courses.deleteCourse).get(adminController.Courses.getCourse)
//
// router.route("/instructors").get(adminController.Instructors.index).post(adminController.Instructors.addInstructor)
//
// router.route("/instructors/:id").put(adminController.Instructors.updateInstructor).delete(adminController.Instructors.deleteInstructor).get(adminController.Instructors.getInstructor)

// router.post("/assignInstructorToCourse",assignInstructorToCourse)

module.exports = router