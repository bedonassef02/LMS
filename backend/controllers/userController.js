const {makeAccount, loginAccount, changeAccountPassword, changeAccountEmail} = require("../models/userModel");

const index = (req, res) => {
    res.status(200).json("index page")
}
const login = (req, res) => {
    loginAccount(req, res)
}

const register = (req, res) => {
    makeAccount(req, res)
}

const changePassword = (req, res) => {
    id = req.params.id
    changeAccountPassword(req, res, id)
}
const changeEmail = (req, res) => {
    id = req.params.id
    changeAccountEmail(req, res, id)
}

module.exports = {login, register, index, changePassword, changeEmail}