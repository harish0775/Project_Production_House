// const nodeMailer = require('../config/nodemailer');
// const path = require('path');

// // this is another way of exporting a method
// exports.newComment = (comment) => {
//     let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comments.ejs');
//     console.log('inside newComment mailer', comment);

//     nodeMailer.transporter.sendMail({
//        from: 'webdev0775@gmail.com',
//        to: comment.user.email,
//        subject: "hey!  HARISH NISHAD",
//        html: htmlString
//     }, (err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }

const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({
       from: 'webdev0775@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}