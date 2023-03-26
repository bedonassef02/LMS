const express = require("express")
const {updateCourse, deleteCourse, getCourses, addCourse, getInstructors, deleteInstructor, updateInstructor,
    addInstructor, adminIndex, assignInstructorToCourse
} = require("../controllers/adminController");
const router = express.Router()

router.get("/",adminIndex)

router.route("/courses").get(getCourses).post(addCourse)

router.route("/courses/:id").put(updateCourse).delete(deleteCourse)

router.route("/instructor").get(getInstructors).post(addInstructor)

router.route("/instructor/:id").put(updateInstructor).delete(deleteInstructor)

router.post("/assignInstructorToCourse",assignInstructorToCourse)

module.exports = router