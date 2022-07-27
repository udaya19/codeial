const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home.ejs',{
    //         title:'Home',
    //         posts:posts
    //     })
    // })
    //Populate user of each posts
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},(err,user)=>{
            return res.render('home.ejs',{
                title:'Home',
                posts:posts,
                all_users:user
            })
        })
        
    })
}