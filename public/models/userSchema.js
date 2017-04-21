const mongoose = require("mongoose");

const users= mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:String
})

module.exports = mongoose.model('User',users)