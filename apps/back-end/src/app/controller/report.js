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
}

const reportPost = (req, res, next) => {
  new report({
    type: req.body.type,
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    reportedUserId: req.body.reportedUserId,
    reportedUserName: req.body.reportedUserName,
    reportedPostId: req.body.reportedPostId,
  }).save((err, data)=>{
    if(err) {
      res.status(500).json({ msg: 'internal server error' });
    }else {
      res.status(200).json({ msg: 'report is recorded' });
    }
  });
}

const reportUser = (req, res, next) => {
  new report({
    type: req.body.type,
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    reportedUserId: req.body.reportedUserId,
    reportedUserName: req.body.reportedUserName,
    reportedPostId: req.body.reportedPostId,
  }).save((err, data)=>{
    if(err) {
      res.status(500).json({ msg: 'internal server error' });
    }else {
      res.status(200).json({ msg: 'report is recorded' });
    }
  });
}

module.exports = { feedback: feedback, resetPassword: resetPassword, reportPost: reportPost, reportUser: reportUser };
