const report = require('../models/reportModel');
const sgMail = require('../config/sendGrid').sgMail;
const user = require("../models/userModel");
var generator = require('generate-password');

const feedbackSet = (req, res, next) => {
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

const feedbackGet = (req, res, next) => {
  report.find({type: 'feedback'},{ useFindAndModify: false }, (err, data) => {
    if (err) {
      return res.status(500).json({ msg: "internal server error" });
    } else {
      res.status(200).json({
        msg: "ok",
        serverData: data
      });
    }
  });


}

const feedbackDelete = (req, res, next) => {
  report.findByIdAndRemove(
    req.body.id,
    (err, data) => {
      if (err) {
        res.status(500).json({ msg: 'internal server error' });
      } else {
        if (data !== null) {
          res.status(200).json({ msg: 'feedback remove' });
        } else {
          res.status(404).json({ msg: 'feedback does not exist' });
        }
      }
    }
  );
}









const setPassword = (req, res, next) => {
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

const setPost = (req, res, next) => {
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




const setUser = (req, res, next) => {
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

const getReportUser = (req, res, next) => {
  report.find({type: 'reportUser'},{ useFindAndModify: false }, (err, data) => {
    if (err) {
      return res.status(500).json({ msg: "internal server error" });
    } else {
      res.status(200).json({
        msg: "ok",
        serverData: data
      });
    }
  });
}





module.exports = {


  feedbackSet: feedbackSet,
  feedbackGet: feedbackGet,
  feedbackDelete: feedbackDelete,



  password: setPassword,
  reportPost: setPost,




  reportUser: setUser,
  getReportUser: getReportUser

};
