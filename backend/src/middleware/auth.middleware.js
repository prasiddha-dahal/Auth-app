require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const authMiddleware = async(req,res,next) => {
    try{
        //first get the token form the cookie

        console.log(req.cookies)  // got the token 
        const token = req.cookies.token;  // there is token 

        if(!token){
            return res.status(401).json({
                message: "no token , authorization denied"
            })
        }
        
        // if there is token , verify who is the user

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //get the user form the database , to identify whose token is this
        const user = await userModel.findById(decoded.userId).select("-password");  //dont select password

        if(!user){
            return res.status(401).json({
                message: "no user found"
            })
        }

        req.user = user

        next()

    } catch(error){
        return res.status(401).json({
            message: "token is not valid"
        })
    }
}

module.exports = authMiddleware
