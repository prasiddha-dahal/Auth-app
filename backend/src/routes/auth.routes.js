const express = require('express')
const router = express.Router();

const {registerUser,loginUser} = require('../controllers/auth.controllers')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register',registerUser)
router.post('/login',loginUser)

router.get('/profile',authMiddleware, (req,res)=>{
    res.json({
        message: "protected route",
        user: req.user
    })
} )

module.exports = router

