const conn = require("../config/dbConnection")
const constants = require("../constatns")

const addNewCourse = (request, response) => {
    const {name, code} = request.body
    const makeNewCourseQuery = `insert into courses set ? `
    const values = {name: name, code: code, status: 'in-active'}
    conn.query(makeNewCourseQuery, values, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404"})
        } else {
            response.status(constants.CREATED).json({msg: `course ${name} created`})
        }
    })
}

const getAllCourses = (request, response) => {
    const getCoursesQuery = `select * from courses`
    conn.query(getCoursesQuery, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404"})
        } else {
            response.status(constants.OK).json({msg: `Get All Courses`, courses: res})
        }
    })
}

const getThisCourse = (request, response, id) => {
    const getCourseQuery = `select * from courses where id = ${id}`
    conn.query(getCourseQuery, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404"})
        } else {
            response.status(constants.OK).json({msg: `Get Course Successfully`, course: res[0]})
        }
    })
}

const updateThisCourse = (request, response, id) => {
    const {name, code, status} = request.body
    const updateCoursesQuery = `update courses set ? where id = ${id}`
    const values = {name: name, status: status, code: code}
    conn.query(updateCoursesQuery, values, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404"})
        } else {
            response.status(constants.OK).json({msg: `Course Updated Successfully`})
        }
    })
}

const deleteThisCourse = (request, response, id) => {
    const deleteCourseQuery = `delete from courses where id = ${id}`
    conn.query(deleteCourseQuery, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404, can't delete this course"})
        } else if (res.affectedRows == 0) {
            response.status(constants.NOT_FOUND).json({msg: "Can't find course with this id"})
        } else {
            response.status(constants.OK).json({msg: "Course Deleted"})
        }
    })
}

module.exports = {addNewCourse, getAllCourses,getThisCourse, updateThisCourse, deleteThisCourse, deleteThisCourse}