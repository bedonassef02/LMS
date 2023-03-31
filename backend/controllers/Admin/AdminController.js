
var AdminCoursesController = require("./Courses/AdminCoursesController")
var AdminInstructorsController = require("./Instructors/AdminInstructorsController")
class AdminController {

    Courses = new AdminCoursesController()
    Instructors = new AdminInstructorsController()
    index(request,response){
        response.status(200).json({msg:"Admin Index Page"})
    }

}

module.exports = AdminController