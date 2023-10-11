const mongoose = require('mongoose')
const { Schema } = mongoose;

const chats = new Schema({
    senderID : mongoose.Schema.Types.ObjectId,
    reciverID : mongoose.Schema.Types.ObjectId,
    messages : String,
    createdAt : {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('chat',chats);