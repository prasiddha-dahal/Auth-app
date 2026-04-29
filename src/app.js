const express = require('express');
const authRoute = require('./routes/auth.routes')

const app = express();

app.use(express.json());
//setting the prefix for all routes
app.use('/api/auth', authRoute);

module.exports = app

