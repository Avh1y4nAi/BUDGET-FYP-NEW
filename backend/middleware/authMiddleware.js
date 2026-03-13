const User = require('../models/User');
const jwt = require('jsonwebtoken'); // for token authentication 
 

const protect = async (req, res, next) => { // to protect routes
    let token;  

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") // Check if the authorization header exists and starts with "Bearer"
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]; // extracting token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // token verification
            req.user = await User.findById(decoded.id).select("-password"); // get user id from token 
            next(); //switch to next controller
        } 
        catch (error) 
        {
            console.log(error); 
            res.status(401).json({message: "Not authorized, token failed"}); //for invalid token 
        }
    }
    if(!token)
    {
        res.status(401).json({messsage: "Not authorized, no token"}); 
    }
}; 

module.exports = {protect}; // exporting protect middleware 

