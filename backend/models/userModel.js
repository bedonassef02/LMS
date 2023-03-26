const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const conn = require("../config/dbConnection")
const asyncHandler = require("express-async-handler");
const util = require('util');

const query = util.promisify(conn.query).bind(conn);

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
const makeAccount = async (request, response) => {
    const {username, email, password, phone} = request.body
    const makeEmailQuery = `insert into users set ? `
    const hashedPassword = await hashPassword(password)
    const values = {
        username: username,
        email: email,
        password: hashedPassword,
        phone: phone,
        status: "active",
        type: "student"
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


module.exports = {makeAccount, loginAccount}