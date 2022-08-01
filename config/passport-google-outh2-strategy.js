const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
//tell passport to use a new strategy or google login
passport.use(new googleStrategy({
    clientID:"1010976756926-p4fu6aklg4bgkvgs80k09n85tmhhcbqi.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:'http://localhost:3000/users/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    //find a user
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
        if(err){
            console.log("Error in google strategy passport",err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user)
        }
        else{
            //if user not found create a user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },(err,user)=>{
                if(err){
                    console.log("Error in creating user",err);
                    return;
                }
                return done(null,user)
            })
        }
    })
}));

module.exports = passport;