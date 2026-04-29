const app = require('./src/app')
const connectDB = require('./src/config/db')


//connecting db
connectDB();

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`server listening at port: ${PORT}`)
})
