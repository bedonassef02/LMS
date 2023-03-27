const {
    addNewInstructor,
    deleteThisInstructor,
    getAllInstructors,
    getThisInstructor, updateThisInstructor
} = require("../../models/admin/adminInstructorModel");

const addInstructor = (req, res) => {
    addNewInstructor(req, res)
}

const updateInstructor = (req, res) => {
    id = req.params.id
    updateThisInstructor(req, res, id)
}

const deleteInstructor = (req, res) => {
    const id = req.params.id
    deleteThisInstructor(req, res, id)
}

const getInstructors = (req, res) => {
    getAllInstructors(req, res)
}

const getInstructor = (req, res) => {
    const id = req.params.id
    getThisInstructor(req, res, id)
}
module.exports = {addInstructor, deleteInstructor, getInstructors, updateInstructor, getInstructor}