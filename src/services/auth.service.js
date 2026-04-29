const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

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

module.exports = {register}


