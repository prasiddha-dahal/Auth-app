require('dotenv').config()
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async ({ username, email, password }) => {
    // first check if user exists or not

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        const error = new Error("Email already exists")
        error.statusCode = 409
        throw error
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    })

    return {
        _id: user.id,
        username: user.username,
        email: user.email
    }
}

const login = async({email, password}) => {
    // check if user exists or not
    
    const user = await userModel.findOne({email});

    if(!user){
        const err = new Error("Invalid email or password")
        err.statusCode = 401
        throw err
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        const err = new Error("Invalid email or password")
        err.statusCode = 401
        throw err
    }

    // if all good now generate token and send it back to controller
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

    return{
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        },
        token
    }

}

module.exports = {register,login}


