const mongoose = require('mongoose')
const { Schema } = mongoose;

const messageSchema = new Schema({
    text : {
        type:String,
        required:true
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    userID : mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('msg',messageSchema);