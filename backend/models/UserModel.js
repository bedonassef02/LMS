const bcrypt = require("bcrypt")
const conn = require("../config/dbConnection")
const util = require('util');
const jwt = require("jsonwebtoken")
const query = util.promisify(conn.query).bind(conn);

class UserModel {
    async getUserById(id) {
        const getUserQuery = `SELECT * FROM users WHERE id = "${id}"`
        var user = [];
        try {
            const rows = await query(getUserQuery);
            user = rows
        } catch (err) {
            return 404
        }
        return user[0]
    }

    async getUserByEmail(email) {
        const getUserQuery = `SELECT * FROM users WHERE email = "${email}"`
        var user = [];
        try {
            const rows = await query(getUserQuery);
            user = rows
        } catch (err) {
            return 404
        }
        return user[0]
    }

    async hashPassword(password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    }

    async comparePassword(loginPassword, dbPassword) {
        if (await bcrypt.compare(loginPassword, dbPassword)) {
            return true
        }
        return false
    }

    async decodeToken(token) {
        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return decode.user
    }

    createToken(user) {
        const token = jwt.sign({
                user: {user}
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "12h",
            }
        );
        return token
    }

    async insertUser(user) {
        const insertUserQuery = `insert into users set ?`
        const hashedPassword = await this.hashPassword(user.password)
        const values = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: hashedPassword,
            type: user.type
        }
        try {
            const rows = await query(insertUserQuery, values);
        } catch (err) {
            return 404
        }
        return 201
    }

    async compareIdWithToken(request, id) {
        let token
        let authHeader = request.headers.authorization
        try {
            token = authHeader.split(" ")[1];
            const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = decode.user
            if (id == user.user.id) return true
            return false
        } catch (err) {
            return false
        }
    }

    async checkPassword(user) {
        const checkUserPasswordQuery = `select password from users where id = ${user.id}`
        try {
            const rows = await query(checkUserPasswordQuery);

            if (await this.comparePassword(user.password, rows[0].password)) {
                return 200
            } else {
                return 401
            }
        } catch (err) {
            return 404
        }
    }

    async updatePassword(user) {
        user.password = await this.hashPassword(user.password)
        const changeUserPasswordQuery = `update users set password = "${user.password}" where id = ${user.id}`
        try {
            await query(changeUserPasswordQuery);
            return true
        } catch (err) {
            return false
        }
    }

    async insertToken(user) {
        const insertTokenQuery = `insert into sessions set ?`
        const values = {user_id: user.id, token: user.token}

        try {
            await query(insertTokenQuery, values);
        } catch (err) {
            return false
        }
        return true
    }

    async isTokenExist(token) {
        const checkTokenQuery = `SELECT * from sessions where token = "${token}"`
        let result = true
        try {
            const rows = await query(checkTokenQuery);
            if (rows.length == 0) result = false
        } catch (err) {
            return false
        }
        return result
    }

    async deleteToken(token) {
        const deleteTokenQuery = `delete from session where user_id = ${token}`
        try {
            await query(deleteTokenQuery);
        } catch (err) {
            return false
        }
        return true
    }
}

module.exports = UserModel