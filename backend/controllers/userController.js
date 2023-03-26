const {makeAccount, loginAccount} = require("../models/userModel");

const index = (req,res)=>{
    res.status(200).json("index page")
}
const login = (req,res)=>{
    loginAccount(req,res)
}

const register = (req,res)=>{
    makeAccount(req,res)
}

module.exports = {login,register,index}