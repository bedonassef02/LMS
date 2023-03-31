const {CourseRegistered, DatabaseError, Unauthorized} = require("../Response/ResponseController");

var UserModel = require("../../models/UserModel")
const userModel = new UserModel()
var CoursesModel = require("../../models/CourseModel")
const coursesModel = new CoursesModel()

class CoursesController {

    async register(request, response) {
        const access_token = request.headers.cookie.split("=")[1]
        const course_id = request.params.id
        const user = await userModel.decodeToken(access_token)
        if (user.user.type == "student") {
            const isRegistered = coursesModel.registerCourse({course_id: course_id, student_id: user.user.id})
            if (isRegistered) {
                CourseRegistered(response)
            } else {
                DatabaseError(response)
            }
        } else {
            Unauthorized(response)
        }
    }

}

module.exports = CoursesController