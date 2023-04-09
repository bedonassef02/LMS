var InstructorModel = require("../../models/InstructorModel")
const {StudentsList, DatabaseError, StudentGradeUpdated, CoursesList} = require("../Response/ResponseController");
const instructorModel = new InstructorModel()
class InstructorController {

    async setStudentGrade(request,response){
        const {student_id,course_id} = request.params
        const {grade} = request.body
        const isInserted = await instructorModel.insertGrades({course_id:course_id,student_id:student_id,grade:grade})

        if(isInserted){
            StudentGradeUpdated(response)
        }else{
            DatabaseError(response)
        }
    }

    async getStudentInCourse(request,response){
        const {instructor_id,course_id} = request.params
        const students = await instructorModel.getStudentsInCourse({course_id:course_id,instructor_id:instructor_id})
        StudentsList(response,students)
    }

    async getStudents(request,response){
        const id = request.params.id
        const students = await instructorModel.getStudents(id)
        StudentsList(response,students)
    }

    async getCourses(request,response){
        const id = request.params.id
        const courses = await instructorModel.getCourses(id)
        CoursesList(response,courses)
    }

}

module.exports = InstructorController