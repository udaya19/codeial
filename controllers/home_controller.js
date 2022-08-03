const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home.ejs',{
    //         title:'Home',
    //         posts:posts
    //     })
    // })
    //Populate user of each posts
try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        },
        populate:{
            path:'likes'
        }
    }).populate('comments').populate('likes');
    let users = await User.find({})
    return res.render('home.ejs',{
        title:'Home',
        posts:posts,
        all_users:users
    })
}
catch(err){
    console.log(err);
}
    
}