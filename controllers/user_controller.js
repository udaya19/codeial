const User = require('../models/user')
module.exports.profile = async function(req,res){
    try{
        let user = await User.findById(req.params.id)
        return res.render('user.ejs',{
        title:"User Profile",
        profile_user:user
        });
    }
    catch(err){
        console.log(err);
    }
    
    
}
module.exports.update = async (req,res)=>{
    if(req.user.id == req.params.id){
        let user = await User.findByIdAndUpdate(req.params.id,req.body)
        return res.redirect('back');
    }
    else{
        res.status(401).send('Unauthorized');
    }
}
module.exports.signUp = function(req,res){
    //if user is logged in then restricting the user to access sign-up page 
    if(req.isAuthenticated()){
        return res.redirect('/users/');
    }
    return res.render('user_signup.ejs',{
        title:"User SignUp"
    });
}

module.exports.signIn = function(req,res){
    //if user is logged in then restricting the user to access sign-in page 
    if(req.isAuthenticated()){
        return res.redirect('/users/');
    }
    return res.render('user_signin.ejs',{
        title:"User SignIn"
    });
}

//get sign up data
module.exports.create = async (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
    let user = await User.findOne({email:req.body.email},(err,user)=>{
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
   return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return console.log(err);
        }
    })
    return res.redirect('/')
}