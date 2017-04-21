const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const users= mongoose.Schema({
    email:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:String
})

const userModel = mongoose.model('User',users)

module.exports = userModel;