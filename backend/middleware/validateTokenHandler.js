const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401)
                return
            }
            const user = decoded.user;
            next()
        })
        if (!token) {
            res.status(401).json("Error 401")
        }
    } else {
        res.status(401).json({msg: "u must have a token"})
    }
})

module.exports = validateToken