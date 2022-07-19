const User = require('../models/user');
const { use } = require('../routes');
module.exports.profile = function(req,res){
    return res.render('user.ejs',{
        title:"User Profile"
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_signup.ejs',{
        title:"User SignUp"
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_signin.ejs',{
        title:"User SignIn"
    });
}

//get sign up data
module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("Error in finding user in sigining in up");
            return
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log("Error in finding user in sigining up");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back')
        }
    })

}
//signin and create a session for user
module.exports.createSession = (req,res)=>{
    //Steps to autheticate
    //Find the user
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("Error in finding user in sigining in");
            return;
        }
        if(user){
            //handle password
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id)
            res.redirect('/users/');
        }
        else{
            //handle user not found
            return res.redirect('back');
        }
    })
    
}