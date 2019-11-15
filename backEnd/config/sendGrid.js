const sgMail = require('@sendgrid/mail');
// var key = process.env.SENDGRID_API_KEY;
// console.log(process.env.SENDGRID_API_KEY + "rrkrr");
sgMail.setApiKey(`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`);


exports.sgMail=sgMail;
