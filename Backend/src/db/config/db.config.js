const mongoose = require('mongoose')
const mongoURL = 'mongodb://127.0.0.1:27017/ChatPro'

const connectDB = async () =>{
    try{
        await mongoose.connect(mongoURL);
        console.log("Connected to Database ChatPro(MongoDB)")
    }catch(e){
        console.log(e.message);
    }
}

module.exports = connectDB;