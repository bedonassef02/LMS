const jwt = require("jsonwebtoken")

class TokenController {

    getEncodedToken(request) {
        let token;
        let authHeader = request.headers.authorization
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            return token
        }
        return false
    }

    async decodeToken(token) {
        let userToken ;
        try {
            userToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        } catch (err) {
            return false
        }
        return userToken.user
    }

}

module.exports = TokenController