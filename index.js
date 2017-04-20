const express = require("express");
const app = express();
const queryAPI = require("./public/routes/searchsalsa")

app.set('view engine', 'ejs')

app.get("/", function(req,res){
    res.send("Hello")
})

app.get("/searchsalsa", queryAPI.searchSalsa)

app.listen(8080,function(req,res){
    console.log("Serving on port 8080")
})