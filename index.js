const express = require("express");
const app = express();
const queryAPI = require("./public/routes/searchsalsa")
const path = require("path");
const User = require("./public/models/userSchema")
const databaseURL = require("./public/routes/secretfile")
const mongoose = require("mongoose")
const bParser = require("body-parser")
app.use(bParser.json());
app.use(bParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/public' ))

app.get("/", function(req,res){
    res.render("html/home")
})

app.get("/registerpage", function(req,res){ 
    res.render("html/register")
})

app.post("/registeruser", function(req,res){
    mongoose.connect(`mongodb://${databaseURL.dbName}:${databaseURL.dbPassword}@ds161018.mlab.com:61018/salsaapp`)
    let newUser = new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })
    newUser.save(function(err){
        if(err) console.log(err)
        else{
            console.log("User created")
        }
    })
})

app.get("/searchsalsa", queryAPI.searchSalsa)

app.listen(8080,function(req,res){
    console.log("Serving on port 8080")
})