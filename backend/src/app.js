const express = require('express');
const cors = require('cors');   // ✅ FIX
const authRoute = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);

module.exports = app
