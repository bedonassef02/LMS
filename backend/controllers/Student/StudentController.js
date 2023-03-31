var StudentModel = require("../../models/StudentModel")
const {DatabaseError, StudentInfo, CourseRegistered, CoursesList} = require("../Response/ResponseController");
const studentModel = new StudentModel()

class StudentController {

    async index(request, response) {
        const id = request.params.id
        const student = await studentModel.getStudentById(id)
        if (student) {
            StudentInfo(response, student)
        } else {
            DatabaseError(response)
        }
    }

    async showCourses(request, response){
        const id = request.params.id
        const courses = await studentModel.courses(id)
        if (courses) {
            CoursesList(response, courses)
        } else {
            DatabaseError(response)
        }
    }


}

module.exports = StudentController