const jwt = require('jsonwebtoken'); // for token authentication 

const protect = (req, res, next) => { // to protect routes
    let token;  

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") // Check if the authorization header exists and starts with "Bearer"
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]; // extracting token 
            const decoded = kwt.verify(token, "SECRET_KEY") // token verification
            req.user = {id: decoded.id}; // get user id from token 
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

