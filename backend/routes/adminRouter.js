const express = require("express")
const {updateCourse, deleteCourse, getCourses,getCourse, addCourse, getInstructors, deleteInstructor, updateInstructor,
    addInstructor, adminIndex, assignInstructorToCourse
} = require("../controllers/adminController");
const {getInstructor} = require("../controllers/admin/adminInstructorController");
const router = express.Router()

router.get("/",adminIndex)

router.route("/courses").get(getCourses).post(addCourse)

router.route("/courses/:id").put(updateCourse).delete(deleteCourse).get(getCourse)

router.route("/instructors").get(getInstructors).post(addInstructor)

router.route("/instructors/:id").put(updateInstructor).delete(deleteInstructor).get(getInstructor)

router.post("/assignInstructorToCourse",assignInstructorToCourse)

module.exports = router