
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, text, html = '', attachments = []) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to, subject, text,
        ...(html && { html }),
        ...(attachments.length && { attachments })
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred: ', error);
                reject(error);
            } else {
                console.log('Email sent: ', info.messageId);
                console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
                resolve(info);
            }
        });
    });
}

module.exports = sendEmail