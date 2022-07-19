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
    //TODO later
}
//signin and create a session for user
module.exports.createSession = (req,res)=>{
    //TODO later
}