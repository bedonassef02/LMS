var UserModel = require("../../models/UserModel")
const jwt = require("jsonwebtoken")
const {
    DatabaseError,
    WrongEmail,
    WrongPassword,
    loginSuccessfully,
    emailAlreadyExist,
    emailCreatedSuccessfully, tokenError, passwordChanged, userInfo
} = require("../Response/ResponseController");
const userModel = new UserModel();

class UserController {

    index(request, response) {
        response.status(200).json({msg: "Index Page"});
    }

    async login(request, response) {
        const {email, password} = request.body
        const user = await userModel.getUserByEmail(email)
        if (user == 404) {
            DatabaseError(response)
        } else if (!user) {
            WrongEmail(response)
        } else {
            if (await userModel.comparePassword(password, user.password)) {
                const userToken = userModel.createToken(user)
                await userModel.insertToken({token: userToken, id: user.id})
                await userModel.online(user.id)
                loginSuccessfully(response, userToken, user)
            } else {
                WrongPassword(response)
            }
        }
    }

    async register(request, response, type = "student") {
        const {email, username, phone, password} = request.body
        const user = await userModel.getUserByEmail(email)
        if (user == 404) {
            DatabaseError(response)
        } else if (user) {
            emailAlreadyExist(response)
        } else {
            const isInserted = await userModel.insertUser({email, username, phone, password, type})
            if (isInserted == 404) {
                DatabaseError(response)
            } else {
                emailCreatedSuccessfully(response)
            }
        }
    }

    async changePassword(request, response) {
        const id = request.params.id
        const {oldPassword, newPassword} = request.body

        if (await userModel.compareIdWithToken(request, id)) {
            const status = await userModel.checkPassword({password: oldPassword, id: id})
            if (status == 200) {
                userModel.updatePassword({id: id, password: newPassword})
                passwordChanged(response)
            } else if (status == 401) {
                WrongPassword(response)
            } else {
                DatabaseError(response)
            }
        } else {
            tokenError(response)
        }
    }

    async profileInfo(request, response) {
        const id = request.params.id
        const user = await userModel.getUserById(id)
        if (await userModel.compareIdWithToken(request, id)) {
            userInfo(response, user)
        } else {
            tokenError(response)
        }
    }

    async logout(request, response) {
        const token = request.headers.cookie
        const user = await userModel.decodeToken(request.headers.cookie.split("=")[1])
        await userModel.offline(user.user.id)
        response.cookie("access_token", '', {httpOnly: true}).status(200).json({
            msg: "Logged out Successfully",
        })
    }

}

module.exports = UserController