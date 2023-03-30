require('dotenv').config()

const jwt = require('jsonwebtoken');

const authenticationToken = (req,res,next)=>{
    //take the token from req headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if(!token){
        next(new Error("Token is required"));
    }
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const user = {
        id: decoded.id,
        division: decoded.division,
        fullName: decoded.fullName
    }
    req.user = user;
    next();
}

module.exports = authenticationToken