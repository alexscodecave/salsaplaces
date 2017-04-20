const express = require("express");
const app = express();
const queryAPI = require("./public/routes/searchsalsa")
const path = require("path");

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/public' ))

app.get("/", function(req,res){
    res.render("html/home")
})

app.get("/searchsalsa", queryAPI.searchSalsa)

app.listen(8080,function(req,res){
    console.log("Serving on port 8080")
})