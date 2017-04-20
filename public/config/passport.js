const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport")
var User = require('models/user');

var configureAuth = require('./auth');

module.exports = function(passport){
    //serialize user
    passport.serializeUser(function(user, complete){
        complete(null,user.id)
    })
    passport.deserializeUser(function(id, complete){
        User.findById(id, function(err,user){
            complete(err,user)
        })
    })
}