const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//Authetication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true 
    },function(req,email,password,done){
        User.findOne({email:email},(err,user)=>{
            if(err){
                req.flash('error',err)
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('Invalid username or password')
                return done(null,false);
            }
            return done(null,user);
        })
    }
))

//serializing the user to decide which key is to be kept n the cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
})
//deserializing the user from the key in the cookies
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log("Error in finding user");
            return done(err);
        }
        return done(null,user);
    })
})

//Checking if the user is authenticated 
passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}
//If user is authenticated storing user details in the locals
passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;