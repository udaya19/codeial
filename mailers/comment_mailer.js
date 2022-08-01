const nodeMailer = require('../config/node-mailer');

exports.newComment = (comment)=>{
    console.log('inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/newComments.ejs');
    nodeMailer.transporter.sendMail({
        from:'udaya.kirangonuguntla.20cse@bmu.edu.in',
        to:'gudaya2002@gmail.com',
        subject:'New Comment published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return
        }
        console.log("Mail delivered",info);
        return
    })
}