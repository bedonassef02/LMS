const {
    addNewCourse,
    getAllCourses,
    updateThisCourse,
    deleteThisCourse,
    getThisCourse
} = require("../../models/adminModel");

const addCourse = (req, res) => {
    addNewCourse(req, res)
}
const updateCourse = (req, res) => {
    const id = req.params.id
    updateThisCourse(req, res, id)
}

const deleteCourse = (req, res) => {
    const id = req.params.id
    deleteThisCourse(req, res, id)
}

const getCourses = (req, res) => {
    getAllCourses(req, res)
}

const getCourse = (req, res) => {
    id = req.params.id
    getThisCourse(req, res, id)
}

module.exports = {addCourse,updateCourse,deleteCourse,getCourse,getCourses}