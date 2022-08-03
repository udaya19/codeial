const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailer');
const commentEmailWorkers = require('../workers/comment_email_worker');
const queue = require('../config/kue');
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
        // commentsMailer.newComment(comment)
        // let job = queue.create('emails',comment).save((err)=>{
        //     if(err){
        //         console.log("Error in creating a queue");
        //     }
        //     console.log(job.id)
        // })
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