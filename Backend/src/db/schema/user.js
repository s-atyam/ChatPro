const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    fName : {
        type:String,
        required:true
    },
    lName : String,
    email : {
        type:String,
        required:true,
        unique:true
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    lastModified : {
        type:Date,
        default:Date.now
    },
    friends : [mongoose.Schema.Types.ObjectId],
    pass : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',userSchema);