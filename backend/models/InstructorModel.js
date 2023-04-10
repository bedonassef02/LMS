const conn = require("../config/dbConnection")
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

var UserModel = require("./UserModel")
const userModel = new UserModel()

class InstructorModel {
    async getInstructorById(id) {
        const getInstructorQuery = `SELECT * FROM users WHERE id = "${id}" and type = "instructor"`
        var Instructor = [];
        try {
            const rows = await query(getInstructorQuery);
            Instructor = rows
        } catch (err) {
            return 404
        }
        return Instructor[0]
    }

    async insertInstructor(instructor) {
        const insertInstructorQuery = `insert into users set ?`
        const values = {}
        try {
            await query(insertInstructorQuery, values);
        } catch (err) {
            return 404
        }
        return 201
    }

    async getAllInstructors() {
        const getAllInstructorsQuery = `select * from users where type="instructor"`
        var instructors = []
        try {
            const rows = await query(getAllInstructorsQuery);
            instructors = rows
        } catch (err) {
            return 404
        }
        return instructors
    }

    async updateInstructor(instructor) {
        const updateInstructorQuery = `update users set ? where ?`
        instructor.password = await userModel.hashPassword(instructor.password)
        const values = [{
            email:instructor.email,
            username: instructor.username,
            password: instructor.password,
            phone: instructor.phone
        }, {id: instructor.id}]
        try {
            await query(updateInstructorQuery, values);
        } catch (err) {
            return false
        }
        return true
    }

    async deleteInstructor(id) {
        const deleteInstructorQuery = `delete from users where id = ${id} and type = "instructor"`
        try {
            await query(deleteInstructorQuery);
        } catch (err) {
            return false
        }
        return true
    }

    async getInstructor(id) {
        const getInstructorQuery = `select * from users where id = ${id} and type = "instructor"`
        var instructors = []
        try {
            const rows = await query(getInstructorQuery);
            instructors = rows
        } catch (err) {
            return false
        }
        return instructors
    }

    async techCourse(info) {
        const teachCourseQuery = `insert into courses_instructors set ?`
        const values = {courseId: info.course_id, instructorId: info.instructor_id}
        const activeCourse = `update courses set status = "active" where id = ${info.course_id}`
        try {
            await query(teachCourseQuery, values);
            await query(activeCourse);
        } catch (err) {
            console.log(err)
            return false
        }
        return true
    }

    async getStudents(id) {
        let students = []
        const getRegisteredStudentQuery = "select student_id,username,email,phone,status from courses_instructors \n" +
            "INNER JOIN student_courses\n" +
            "on student_courses.course_id = courses_instructors.courseId\n" +
            "INNER join users \n" +
            "on users.id = student_courses.student_id\n" +
            `where courses_instructors.instructorId = ${id} ` +
            `ORDER by courses_instructors.courseId`
        try {
            const rows = await query(getRegisteredStudentQuery);
            students = rows
        } catch (err) {
            return false
        }
        return students
    }

    async insertGrades(users) {
        const insertGradesQuery = `update student_courses set grade = ${users.grade} where student_id = ${users.student_id} and course_id = ${users.course_id}`
        console.log(insertGradesQuery)
        try {
            await query(insertGradesQuery);
        } catch (err) {
            return false
        }
        return true
    }

    async getStudentsInCourse(info) {
        const getStudentsInCourseQuery = "select users.id,users.username,student_courses.grade" +
            " from courses_instructors\n" +
            "INNER JOIN courses\n" +
            "on courses.id = courses_instructors.courseId \n" +
            "INNER join student_courses\n" +
            "on student_courses.course_id = courses.id\n" +
            "inner join users \n" +
            "on users.id = student_courses.student_id\n" +
            `where courses_instructors.instructorId = ${info.instructor_id}` + ` and courseId = ${info.course_id}`
        var students = []
        try {
            const rows = await query(getStudentsInCourseQuery);
            students = rows
        } catch (err) {
            console.log(err)
        }
        return students
    }

    async getCourses(id) {
        let courses = []
        const getCoursesQuery = "SELECT id,name,code,img_url from courses_instructors\n" +
            "INNER join courses\n" +
            "on courses.id = courses_instructors.courseId\n" +
            `where courses_instructors.instructorId = ${id}`
        try {
            const rows = await query(getCoursesQuery);
            courses = rows
        } catch (err) {
            return false
        }
        return courses
    }
}

module.exports = InstructorModel