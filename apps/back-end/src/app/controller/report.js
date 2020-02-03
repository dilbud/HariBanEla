const report = require('../models/reportModel');
const sgMail = require('../config/sendGrid').sgMail;

const feedback = (req, res, next) => {
    console.log(req.body);
    new report({
        type: { type: String, required: true },
        userId: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: true },
        date: { type: Date, required: false, default: Date.now },
        content: { type: String, required: false },
      })
}

const resetPassword = (req, res, next) => {
  console.log(req.body);
  // const msg = {
  //   to: req.body.email,
  //   from: 'Account@haribnela.lk',
  //   subject: 'Reset Password',
  //   text: `Your Appointment with ${appointment.professionalName} has been accepted.
  //           Subject:${appointment.subject}
  //           Description: ${appointment.description}
  //           Starting Time: ${appointment.startTime}.
  //           Ending Time: ${appointment.endTime}
  //           Payment Amount : ${appointment.paymentAmount}
  //           URl for payment : ${appointment.paymentUrl}`,
  //   html: `
  //   <div>
  //   Your Appointment with ${appointment.professionalName} has been accepted.
  //   <div> Subject:${appointment.subject} </div>
  //   <div>    Description: ${appointment.description} </div>
  //   <div>   Starting Time: ${appointment.startTime}. </div>
  //   <div>    Ending Time: ${appointment.endTime} </div>
  //           <div>    Payment Amount : ${appointment.paymentAmount} </div>
  //   </div>
  //  <div> <a href="${appointment.paymentUrl}>Click here to make your payment </a> </div>
  //  </div>`,
  // };

}

const reportPost = (req, res, next) => {
  console.log(req.body);
}

const reportUser = (req, res, next) => {
  console.log(req.body);

}

module.exports = { feedback: feedback, resetPassword: resetPassword, reportPost: reportPost, reportUser: reportUser };