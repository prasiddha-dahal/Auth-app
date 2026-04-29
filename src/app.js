const express = require('express');
const authRoute = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')  // needed to read the cookie

const app = express();

app.use(express.json());
app.use(cookieParser())
//setting the prefix for all routes
app.use('/api/auth', authRoute);

module.exports = app

