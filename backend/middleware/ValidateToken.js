const jwt = require("jsonwebtoken")

var TokenController = require("../controllers/Token/TokenController")
const {tokenError, Unauthorized} = require("../controllers/Response/ResponseController");
const {response} = require("express");
const tokenController = new TokenController()
class ValidateToken {

    async validateUserToken(request, response, next) {
        const encodedToken = tokenController.getEncodedToken(request)
        if(encodedToken){
            const token = await tokenController.decodeToken(encodedToken)
            if(token){
                next()
            }else{
                tokenError(response);
            }
        }else{
            tokenError(response);
        }
    }

    async validateAdminToken(request, response, next){
        const encodedToken = tokenController.getEncodedToken(request)
        if(encodedToken){
            const token = await tokenController.decodeToken(encodedToken)
            if(token){
                try{
                    if(token.user.type=="admin"){
                        next()
                    }else{
                        Unauthorized(response)
                    }
                }catch (err){
                    tokenError(response)
                }
            }else{
                tokenError(response);
            }
        }else{
            tokenError(response);
        }
    }


    async validateStudentToken(request, response, next){
        const encodedToken = tokenController.getEncodedToken(request)
        if(encodedToken){
            const token = await tokenController.decodeToken(encodedToken)
            if(token){
                try{
                    if(token.user.type=="student"){
                        next()
                    }else{
                        Unauthorized(response)
                    }
                }catch (err){
                    tokenError(response)
                }
            }else{
                tokenError(response);
            }
        }else{
            tokenError(response);
        }
    }

}


module.exports = ValidateToken