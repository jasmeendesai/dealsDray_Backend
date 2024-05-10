const jwt = require('jsonwebtoken');

require('dotenv').config()
const {SECRET_KEY} = process.env

const Authentication = async function(req, res, next){
    try{
        let token = req.cookies.accessToken;
        
        if(!token) return res.status(401).json("Not logged in!")

        let decodeToken = jwt.verify(token, SECRET_KEY);
        req.decodedToken = decodeToken.userId
        next()

    }
    catch(error){
        if(error.message =="Invalid token"){
            return res.status(403).json("Token is not valid!");
        }
        return res.status(500).json(error.message)
    }
}

module.exports = {Authentication}