
const adminIndex = (req,res)=>{
    res.status(200).json("Admin Index")
}
const addCourse = (req,res)=>{
    res.status(200).json("Admin Add Course")
}

const updateCourse = (req,res)=>{
    res.status(200).json("Admin Update Course")
}

const deleteCourse = (req,res)=>{
    res.status(200).json("Admin Delete Course")
}

const getCourses = (req,res)=>{
    res.status(200).json("Admin Courses List")
}

const addInstructor = (req,res)=>{
    res.status(200).json("Admin Add instructor")
}

const updateInstructor = (req,res)=>{
    res.status(200).json("Admin Update instructor")
}

const deleteInstructor = (req,res)=>{
    res.status(200).json("Admin Delete instructor")
}

const getInstructors = (req,res)=>{
    res.status(200).json("Admin instructors List")
}

const assignInstructorToCourse = (req,res)=>{
    res.status(200).json("Admin assignInstructorToCourse")
}

module.exports = {addCourse,updateCourse,deleteCourse,getCourses,addInstructor,updateInstructor,deleteInstructor,getInstructors,adminIndex,assignInstructorToCourse}