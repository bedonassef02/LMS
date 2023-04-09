const express = require("express")
const router = express.Router()

var InstructorController = require("../controllers/Instructor/InstructorController")
const instructorController = new InstructorController()


router.get('/:id/students', instructorController.getStudents)
router.get('/:id/courses', instructorController.getCourses)
router.get("/:instructor_id/courses/:course_id/students",instructorController.getStudentInCourse)
router.post("/:instructor_id/courses/:course_id/students/:student_id",instructorController.setStudentGrade)

module.exports = router