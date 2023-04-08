var CourseModel = require("../../../models/CourseModel")
var url = require('url');
const {
    DatabaseError,
    CourseCreatedSuccessfully,
    CourseAlreadyExist, CoursesList, CourseUpdated, CourseDeleted
} = require("../../Response/ResponseController");

const courseModel = new CourseModel()


class AdminCoursesController {

    async index(request, response) {
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        const courses = await courseModel.getAllCourses(query.active)
        if (courses == 404) {
            DatabaseError(response)
        } else {
            CoursesList(response, courses)
        }
    }


    async addCourse(request, response) {
        const {name, code} = request.body
        const course = await courseModel.getCourseByName(name)
        if (course == 404) {
            DatabaseError(response)
        } else if (!course) {
            CourseAlreadyExist(response)
        } else {
            const isInserted = await courseModel.insertCourse({name: name, code: code,img_url:'images/'+request.file.filename})
            if (isInserted == 404) {
                DatabaseError(response)
            } else {
                CourseCreatedSuccessfully(response)
            }
        }
    }

    async updateCourse(request, response) {
        const {name, code} = request.body
        const id = request.params.id
        const isUpdated = await courseModel.updateCourse({id: id, name: name, code: code})
        if (isUpdated) {
            CourseUpdated(response)
        } else {
            DatabaseError(response)
        }
    }

    async deleteCourse(request, response) {
        const id = request.params.id
        const isDeleted = await courseModel.deleteCourse(id)
        if (isDeleted) {
            CourseDeleted(response)
        } else {
            DatabaseError(response)
        }
    }

    async getCourse(request, response) {
        const id = request.params.id
        const course = await courseModel.getCourse(id)
        if (course) {
            CoursesList(response, course)
        } else {
            DatabaseError(response)
        }
    }

}

module.exports = AdminCoursesController