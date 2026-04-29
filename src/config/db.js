require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected the db successfully")
    }catch(err){
        console.log("database error "+err)
    }
}

module.exports = connectDB

