const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const conn = require("../config/dbConnection")
const asyncHandler = require("express-async-handler");
const util = require('util');

const query = util.promisify(conn.query).bind(conn);

const checkIsSameId = async (request, id) => {
    let token
    let authHeader = request.headers.authorization
    token = authHeader.split(" ")[1];
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = decode.user
    if (id == user.id) return true
    return false
}
let getUserId = async function (email) {
    const isEmailExistQuery = `SELECT id FROM users WHERE email = "${email}"`
    var userId = [];
    try {
        const rows = await query(isEmailExistQuery);
        userId = rows
    } finally {
        return userId[0];
    }
};
const createToken = (email, username, id = null, type = "student") => {
    if (!id) {
        getUserId(email).then(value => {
            id = value.id
        })
    }
    const token = jwt.sign({
            user: {
                email: email,
                username: username,
                type: type,
                id: id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return token
}
const checkValidEmail = (email) => {
    const isEmailExistQuery = `SELECT * FROM users WHERE email = "${email}"`
    conn.query(isEmailExistQuery, (err, res) => {
        if (err) return 404
        else if (res.length > 0) {
            return 409
        } else return 200
    })
}

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}
const makeAccount = async (request, response, type = "student") => {
    const {username, email, password, phone} = request.body
    const makeEmailQuery = `insert into users set ? `
    const hashedPassword = await hashPassword(password)
    const values = {
        username: username,
        email: email,
        password: hashedPassword,
        phone: phone,
        status: "active",
        type: type
    }
    const status = checkValidEmail(email)
    if (status == 404) {
        response.status(status).json({msg: "Error Can't check email"})
    } else if (status == 409) {
        response.status(status).json({msg: "Email already Exist"})
    } else {
        conn.query(makeEmailQuery, values, (err, res) => {
            if (err) {
                response.status(404).json({msg: "Error Can't Insert email"})
            } else {
                const token = createToken(email, username)
                response.status(201).json({msg: "Account Created", accessToken: token})
            }
        })
    }
}


const loginAccount = asyncHandler(async (request, response) => {
    const {email, password} = request.body
    const isEmailExistQuery = `SELECT * FROM users WHERE email = "${email}"`
    conn.query(isEmailExistQuery, async (err, res) => {
        if (err) {
            response.status(404).json({msg: "Error, we can't check email"})
        } else if (res[0] && (await bcrypt.compare(password, res[0].password))) {
            const {id, username, email, type} = res[0]
            const token = createToken(email, username, id, type)
            response.status(200).json({msg: "Logged In", accessToken: token})
        } else {
            response.status(403).json({msg: "Wrong Email Or Password"})
        }
    })
})

const changeAccountPassword = async (request, response, id) => {
    const isSameId = await checkIsSameId(request, id)
    const {oldPassword, newPassword} = request.body
    conn.query(`select password from users where id = ${id}`, async (err, res) => {
        if (err || !isSameId) {
            response.status(404).json({msg: "Error 404"})
        } else if (res.length != 0) {
            if (res[0] && (await bcrypt.compare(oldPassword, res[0].password))) {
                const hashNewPassword = await hashPassword(newPassword)
                const changePasswordQuery = `update users set password = "${hashNewPassword}" where id = ${id}`
                conn.query(changePasswordQuery, (error, result) => {
                    if (error) {
                        response.status(404).json({msg: "Error 404"})
                    } else {
                        response.status(202).json({msg: "Password Changed"})
                    }
                })
            } else {
                response.status(404).json({msg: "Not same Password"})
            }
        }
    })
}

const changeAccountEmail = async (request, response, id) => {
    const isSameId = await checkIsSameId(request, id)
    const {email} = request.body
    conn.query(`select email from users where id = ${id}`, async (err, res) => {
        if (err || !isSameId) {
            response.status(404).json({msg: "Error 404"})
        } else {
            const changeEmailQuery = `update users set email = "${email}" where id = ${id}`
            conn.query(changeEmailQuery, (error, result) => {
                if (error) {
                    response.status(404).json({msg: "Error 404"})
                } else {
                    response.status(202).json({msg: "Email Changed"})
                }
            })
        }
    })
}
module.exports = {makeAccount, loginAccount, hashPassword, changeAccountPassword,changeAccountEmail}