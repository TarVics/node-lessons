const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {NO_REPLY_EMAIL,NO_REPLY_EMAIL_PASSWORD} = require('../config');
const {ApiError} = require('../error');
const emailTemplates = require('../email-templates');

const sendEmail = async (receiverMail, emailAction, locals = {}) => {
    console.log(emailAction, '- EMAIL SERVICE');
    const templateInfo = emailTemplates[emailAction];
    if (!templateInfo) {
        throw new ApiError('Wrong template', 500);
    }

    const templateRenderer = new EmailTemplates({
       views: {
           root: path.join(process.cwd(), 'email-templates')
       }
    });

    Object.assign(locals || {}, { frontendURL: 'google.com' });

    const html = await templateRenderer.render(templateInfo.templateName, locals);

/*
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haideryaqoobengr@gmail.com',
            pass: '**********'
        }
    });

    var mailOptions = {
        from: 'haideryaqoobengr@gmail.com',
        to: 'haideryaqoob720@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
*/

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    return transporter.sendMail({
        from: 'No reply',
        to: receiverMail,
        subject: templateInfo.subject,
        html
    });
}

module.exports = {
    sendEmail
}