const report = require('../models/reportModel');
const sgMail = require('../config/sendGrid').sgMail;
const user = require("../models/userModel");
var generator = require('generate-password');

const feedback = (req, res, next) => {
  new report({
    type: req.body.type,
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
  }).save((err, data)=>{
    if(err) {
      res.status(500).json({ msg: 'internal server error' });
    }else {
      res.status(200).json({ msg: 'feedback is recorded' });
    }
  });
}

const resetPassword = (req, res, next) => {
  var password = generator.generate(
    {
      length: 10,
      numbers: true
    });
  const email = req.body.email;
  user.findOneAndUpdate({ email: email }, { password: password }, { new: true, select: 'email password' }, (err, data) => {
    if (err) {
      res.status(500).json({ msg: 'internal server error' });
    } else {
      if (data !== null) {
        const msg = {
          to: data.email,
          from: 'buddikadilan3@gmail.com',
          subject: 'Sending with Twilio SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: 'your password is ' + '<strong>' + data.password + '<strong>',
        };
        sgMail.send(msg);
        res.status(200).json({ msg: 'check email box' });
      } else {
        res.status(404).json({ msg: 'user does not exist' });
      }
    }
  });

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
