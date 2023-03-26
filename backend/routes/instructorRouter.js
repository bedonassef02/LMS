const express = require("express")
const {instructorIndex, setGradeToStudent, getEnrolledStudentsToCourse} = require("../controllers/instructorController");
const router = express.Router()

router.get("/",instructorIndex)

router.post("/setGrades",setGradeToStudent)

router.get("/:courseId/enrolled",getEnrolledStudentsToCourse)

module.exports = router