const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
module.exports.create = async (req,res)=>{
    let post = await Post.findById(req.body.post);
    if(post){
       let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.body.user
        })
        post.comments.push(comment);
        post.save();
        comment = await comment.populate('user','name email')
        res.redirect('back')
    }

}

module.exports.destroy = async (req,res)=>{
    // console.log(" k,")
   try {
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post
        // await Comment.deleteOne({id:comment.id})
        comment.remove()
        let post = await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
    }
    else{
        return res.redirect('back')
    }
   }
   catch (error) {
    console.log('Error');
   }
}