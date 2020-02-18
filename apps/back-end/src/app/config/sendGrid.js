const sgMail = require('@sendgrid/mail');
// var key = process.env.SENDGRID_API_KEY;
// console.log(process.env.SENDGRID_API_KEY + "rrkrr");
sgMail.setApiKey(
  `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`
);
exports.sgMail = sgMail;
