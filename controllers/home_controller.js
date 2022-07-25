const Post = require('../models/post');
module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home.ejs',{
    //         title:'Home',
    //         posts:posts
    //     })
    // })
    //Populate user of each posts
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home.ejs',{
            title:'Home',
            posts:posts
        })
    })
}