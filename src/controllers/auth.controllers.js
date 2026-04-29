const authService = require('../services/auth.service')

const registerUser = async (req,res) => {
    try {
        const user = await authService.register(req.body)
        res.status(201).json({
            message: "user created successfully",
            user
        })
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong"
        })
    }
}

module.exports = {registerUser}
