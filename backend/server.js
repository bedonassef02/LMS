const express = require("express")
const {add} = require("nodemon/lib/rules");
const dotenv = require("dotenv").config()
const cors = require("cors")

const app = express()
const port = process.env.PORT || 5001
app.use(express.json())
app.use(cors())


var ValidateToken = require("./middleware/ValidateToken")
const validateToken = new ValidateToken();

app.use("/api",require("./routes/userRouter"))
app.use("/api/admin",validateToken.validateAdminToken,require("./routes/adminRouter"))
app.use("/api/students",validateToken.validateStudentToken,require("./routes/studentRouter"))

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})