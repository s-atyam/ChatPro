const mongoose = require('mongoose')
const mongoURL = 'mongodb://localhost:27017/ChatPro'

const connectDB = async () =>{
    try{
        await mongoose.connect(mongoURL);
        console.log("Connected to Database ChatPro(MongoDB)")
    }catch(e){
        console.log(e.message);
    }
}

module.exports = connectDB;