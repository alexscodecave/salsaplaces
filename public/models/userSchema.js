const mongoose = require("mongoose");

const users= mongoose.Schema({
    local:{
        email:String,
        password:String,
    },
    facebook:{
        id:String,
        token:String,
        email:String,
        name:String
    }
})

module.exports = mongoose.model('User',users)