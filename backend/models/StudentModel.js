const bcrypt = require("bcrypt")
const conn = require("../config/dbConnection")
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

class StudentModel {

    async getStudentById(id) {
        const getStudentQuery = `SELECT * FROM users WHERE id = "${id}" and type = "student"`
        var student = [];
        try {
            const rows = await query(getStudentQuery);
            student = rows
        } catch (err) {
            return false
        }
        return student[0]
    }

    async courses(id) {
        const getStudentCoursesQuery = `SELECT DISTINCT * FROM student_courses inner join courses on student_courses.course_id = courses.id  where student_courses.student_id = "${id}"`
        var courses = [];
        try {
            const rows = await query(getStudentCoursesQuery);
            courses = rows
        } catch (err) {
            return false
        }
        return courses
    }

    async addCourse(studentId, courseId) {
        const registerCourseQuery = `insert into student_courses set ?`
        const values = {student_id: studentId, course_id: courseId}

        try {
            await query(registerCourseQuery, values);
        } catch (err) {
            return false
        }
        return true
    }




}

module.exports = StudentModel