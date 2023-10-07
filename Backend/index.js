const express = require('express')
const connectDB = require('./src/db/config/db.config');

connectDB();
const PORT = 5000;
const app = express();

app.use(express.json());

app.use('/auth',require('./src/routes/userauth'))

app.listen(PORT,(e)=>{
    if(e){
        console.log("Server error: ",e);
    }else{
        console.log(`Server Listening on PORT ${PORT}`)
    }
})