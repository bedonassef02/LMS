
const instructorIndex = (req,res)=>{
    res.status(200).json("Instructor Index")
}

const getEnrolledStudentsToCourse = (req,res)=>{
    res.status(200).json("Instructor getEnrolledStudentsToCourse")
}

const setGradeToStudent = (req,res)=>{
    res.status(200).json("Instructor setGradeToStudent")
}

module.exports = {instructorIndex, getEnrolledStudentsToCourse,setGradeToStudent}