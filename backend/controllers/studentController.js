
const getStudent = (req,res)=>{
    res.status(200).json("student index")
}

const registerCourse = (req,res)=>{
    res.status(200).json("register course")
}

const showCourses = (req,res)=>{
    res.status(200).json("my registerd courses")
}

module.exports = {getStudent,registerCourse,showCourses}