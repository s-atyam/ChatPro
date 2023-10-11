const mongoose = require('mongoose')
const mongoURL = 'mongodb://localhost:27017/ChatPro'

const connectDB = async () =>{
    try{
        console.log("Connected to Database ChatPro(MongoDB)")
        return await mongoose.connect(mongoURL);
    }catch(e){
        console.log(e.message);
    }
}

module.exports = connectDB;