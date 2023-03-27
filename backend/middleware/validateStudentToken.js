const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateStudentToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            try {
                const user = decoded.user;
                if (err || user.type != "student") {
                    res.status(401).json("u are not auth")
                } else {
                    res.status(200)
                }
                next()
            } catch (error) {
                res.status(404).json({msg: "Token Error"})
            }
        })
        if (!token) {
            res.status(401).json("Error 401")
        }
    } else {
        res.status(401).json({msg: "u must have a token"})
    }
})

module.exports = validateStudentToken