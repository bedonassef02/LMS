const express = require("express")
const {login} = require("./controllers/userController");
const dotenv = require("dotenv").config()
const validateAdminToken = require("./middleware/validateAdminToken")
const validateStudentToken = require("./middleware/validateStudentToken")
const validateInstructorToken = require("./middleware/validateInstructorToken")

const app = express()
const port = process.env.PORT || 5001
app.use(express.json())

app.use("/api/", require("./routes/userRouter"))
app.use("/api/student/", validateStudentToken, require("./routes/studentRouter"))
app.use("/api/admin/", validateAdminToken, require("./routes/adminRouter"))
app.use("/api/instructor/", validateInstructorToken, require("./routes/instructorRouter"))

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})