const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport")
var User = require('./models/user');

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

    passport.use('local-login', new LocalStrategy({
        username:'email',
        password:'password',
        passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({'local.email':email}, function(err,user){
            if(err){
                console.log(err)
            }
            if(!user){
                return done(null,false,req.flash('loginMessage','No user found'))
            }
            if(!user.validPassword(password)){
                return done(null,false,req.flash('loginMessage','Oops! Wrong password'));
            }
            return done(null,user)
        })
    }))

    passport.use(new FacebookStrategy({
        facebookAuth: configureAuth.facebookAuth,
        clientSecret:configureAuth.clientSecret,
        callbackURL: configureAuth.callbackURL
    },
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({'facebook.id':profile.id}, function(err,user){
                if(err)
                return done(err)
                if(user){
                    return done(null,user)
                }else{
                    let newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token=token;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if(err){console.log(err)}
                        return done(null,newUser)
                    })

                }
            })
        })
    }
    ))

}