var InstructorModel = require("../../../models/InstructorModel")
const {DatabaseError, CoursesList, InstructorsList, InstructorDeleted, InstructorUpdated} = require("../../Response/ResponseController");
const instructorModel = new InstructorModel()
var UserController = require("../../User/UserController")
const userController = new UserController()

class AdminInstructorsController {
    async index(request, response) {
        const instructors = await instructorModel.getAllInstructors()
        if (instructors == 404) {
            DatabaseError(response)
        } else {
            InstructorsList(response, instructors)
        }
    }

    async addInstructor(request, response) {
        userController.register(request, response, "instructor")
    }

    async updateInstructor(request, response) {
        const {email, username,phone,password} = request.body
        const id = request.params.id
        const isUpdated = await instructorModel.updateInstructor({id: id, username: username, email: email,phone:phone,password:password})
        if (isUpdated) {
            InstructorUpdated(response)
        } else {
            DatabaseError(response)
        }
    }

    async deleteInstructor(request, response) {
        const id = request.params.id
        const isDeleted = await instructorModel.deleteInstructor(id)
        if (isDeleted) {
            InstructorDeleted(response)
        } else {
            DatabaseError(response)
        }
    }

    async getInstructor(request, response) {
        const id = request.params.id
        const instructor = await instructorModel.getInstructor(id)
        if (instructor) {
            InstructorsList(response, instructor)
        } else {
            DatabaseError(response)
        }
    }
}

module.exports = AdminInstructorsController