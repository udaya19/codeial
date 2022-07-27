const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async (req,res)=>{
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back')
    }
    catch(err){
        console.log(err);
    }
   
}

module.exports.destroy = async (req,res)=>{
   try{
    let post = await Post.findById(req.params.id)
    if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id},(err)=>{
            return res.redirect('back')
        })

    }
    else{
        return res.redirect('back');
    }
   }
   catch(err){
    console.log(err);
   }
}