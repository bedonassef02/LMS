
const {addCourse,updateCourse,deleteCourse,getCourse,getCourses} = require("./admin/adminCoursesController")
const {addInstructor,deleteInstructor,getInstructors,updateInstructor} = require("./admin/adminInstructorController")
const {assignInstructorToThisCourse} = require("../models/admin/adminInstructorModel");
const adminIndex = (req, res) => {
    res.status(200).json({msg: "Admin Index"})
}

const assignInstructorToCourse = (req, res) => {
    assignInstructorToThisCourse(req,res)
}

module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourses,
    getCourse,
    addInstructor,
    updateInstructor,
    deleteInstructor,
    getInstructors,
    adminIndex,
    assignInstructorToCourse
}