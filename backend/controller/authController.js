const User = require("../models/User"); //importing user model 
const bcrypt = require("bcryptjs"); //password hashing library
const jwt = require("jsonwebtoken"); //for token authentication
const { useReducer } = require("react");

exports.register = async (req, res) => // register user controller
{
    try
    {
        const {name, email, password} = req.body

        if (!name || !email || !password) //checking empty fields
        {
            return res.status(400).json ({message: "Please fill in all fields"}); // message for empty fields 
        }

        const userExists = await User.findOne({email}); // checking existing user with the same email
        if (userExists) 
        {
            return res.status(400).json({message: "User exists"}); 
        }

        const hashedPassword = await bcrypt.hash(password, 5); // hashing password with the help of bcrypt 

        const user = await User.create
        ({
            name, email, password: hashedPassword // creating new user 
        }); 

        if (user)
        {
            res.status(201).json
            ({
                message: "User registered!", _id: user._id, name: user.name, email: user.email, theme: user.theme, profilePicture: user.profilePicture, token: generateToken(user._id) 
            }); // response for successful user registration 
        }
        else
        {
            res.status(400).json({message: "Invalid user data"}); // response for invalid user data 
        }
    }
    catch (error)
    {
        res.status(500).json({message: error.message}); // response for server error
    }
}; 




exports.login = async (req, res) => // login user controller
{
    try
    {
        const {email, password} = req.body; 

        if (!email || !password) 
        {
            return res.status(400).json({message: "Please fill up all the fields"}); 
        }
        
        const user = await User.findOne({email}); // finding user with given email
        if (!user)
        {
            return res.status(400).json({message: "Invalid credentials"}); // response for invalid credentials
        }

        const isMatch = await bcrypt.compare(password, user.password); // comparing user password with hashed password
        if (!isMatch)
        {
            return res.status(400).json({message: "Invalid password"}); //response for invalid password 
        }

        res.json
        ({
            message: "Login successful!", _id: user._id, name: user.name, email: user.email, theme: user.theme, profilePicture: user.profilePicture, token: generateToken(user._id)
        }); // response for successful login 
    }
    catch (error)
    {
        res.status(500).json({message: error.message}); // response for server error 
    }
}; 




exports.getUserProfile = async (req, res) => // get user profile controller
{
    try
    {
        const user = await User.findById(req.user._id).select("-password"); // find user by id excluding password field 
        if (user)
        {
            res.json(user); // response with user data 
        }
        else
        {
            res.status(404).json({message: "User not found"}); // res for user not found
        }
    }
    catch (error)
    {
        res.status(500).json({message: error.message}); // response for server error
    }
};




exports.updateUserProfile = async (req, res) => // controller for updating user prfile
{
    try
    {
        const user = await User.findById(req.user._id); // finding by user id 
        if (user)
        {
            user.name = req.body.name || user.name; // update user name
            user.email = req.body.email || user.email; // update user email
            user.theme = req.body.theme || user.theme; // updating user theme    
            user.profilePicture = req.body.profilePicture || user.profilePicture; // update user profile pic 
            
            if (req.body.password) // if password is in the request body
            {
                user.password = await bcrypt.hash(req.body.password, 5); // update user pass with hashing 
            }
        

            const updatedUser = await user.save(); // saving updated user data 

            res.json 
            ({
                message: "Profile updated!", _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, theme: updatedUser.theme, profilePicture: updatedUser.profilePicture, token: generateToken(updatedUser._id) // success response for updated profile
            }); //token generated for updated user 
        }
        else 
        {
            res.status(404).json({message: "User not found"}); // response for user not found 
        }
    } 
    catch (error)
    {
        res.status(500).json({message: error.message}); // response for server error
    }
};




const generateToken = (id) => // generate token function 
{
    return jwt.sign({id}, "SECRETKEY", {expiresIn: "20d"}); // sign token with user id and secret key, set expiration time 
}; 