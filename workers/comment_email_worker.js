const queue = require('../config/kue');
const commentsMailer = require('../mailers/comment_mailer');
queue.process('emails',(job,done)=>{
    console.log('emails worker is procesing a job',job.data);
    commentsMailer.newComment(job.data);
    done();
})