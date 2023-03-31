
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
        const values = [{username: instructor.name, password: instructor.password,phone:instructor.phone}, {id: instructor.id}]
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
}

module.exports = InstructorModel