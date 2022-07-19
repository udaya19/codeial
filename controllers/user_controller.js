const User = require('../models/user')
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
    //TODO later
}