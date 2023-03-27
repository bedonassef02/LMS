const {makeAccount, hashPassword} = require("../userModel")
const conn = require("../../config/dbConnection")
const constants = require("../../constatns")

const addNewInstructor = (request, response) => {
    makeAccount(request, response, "instructor")
}

const deleteThisInstructor = (request, response, id) => {
    const deleteInstructorQuery = `delete from users where id = ${id} and type="instructor"`
    conn.query(deleteInstructorQuery, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404 "})
        } else if (res.affectedRows == 0) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404, can't delete instructor"})
        } else {
            response.status(constants.OK).json({msg: "Instructor Deleted"})
        }
    })
}

const getAllInstructors = (request, response) => {
    const getInstructorsQuery = `select * from users where type="instructor"`
    conn.query(getInstructorsQuery, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404 "})
        } else {
            response.status(constants.OK).json({msg: "Instructors List", instructors: res})
        }
    })
}

const getThisInstructor = (request, response, id) => {
    const getInstructorQuery = `select * from users where id=${id} and type="instructor"`
    conn.query(getInstructorQuery, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404 "})
        } else {
            response.status(constants.OK).json({msg: `Instructor with id = ${id}`, instructor: res[0]})
        }
    })
}

const updateThisInstructor = async (request, response, id) => {
    const {username, email, password, phone} = request.body
    const updateInstructorQuery = `update users set ? where id = ${id}`
    const hashedPassword = await hashPassword(password)
    const values = {username: username, email: email, password: hashedPassword, phone: phone}
    conn.query(updateInstructorQuery, values, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404"})
        } else {
            response.status(constants.OK).json({msg: `Instructor Updated Successfully`})
        }
    })
}

const assignInstructorToThisCourse = (request, response) => {
    const {courseId, instructorId} = request.body
    const assignInstructorToCourseQuery = `insert into courses_instructors set ?`
    const values = {courseId: courseId, instructorId: instructorId}
    conn.query(assignInstructorToCourseQuery, values, (err, res) => {
        if (err) {
            response.status(constants.NOT_FOUND).json({msg: "Error 404"})
        } else {
            response.status(constants.OK).json({msg: `Instructor Assined To Course Successfully`})
        }
    })
}

module.exports = {addNewInstructor, deleteThisInstructor, getAllInstructors, getThisInstructor, updateThisInstructor,assignInstructorToThisCourse}