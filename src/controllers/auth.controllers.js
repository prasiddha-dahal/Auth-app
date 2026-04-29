const authService = require('../services/auth.service')

const registerUser = async (req, res) => {
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

const loginUser = async (req, res) => {
    try {
        const { user, token } = await authService.login(req.body)
        //send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.status(200).json({
            message: "login successfully",
            user
        })
    }catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "something went wrong"
        })
    }

}

module.exports = { registerUser, loginUser }
