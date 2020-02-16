const sgMail = require('../config/sendGrid').sgMail;
const user = require("../models/userModel");

const acc = (req, res, next) => {
  user.findByIdAndUpdate(
    req.body.id,
    {pending: false , userType: 'pro' },
    { new: true, useFindAndModify: false, select: '-password' },
    (err, user) => {
      if (err) {
        if (err.kind && err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'please sign in' });
        } else {
          return res.status(500).json({ msg: 'internal server error' });
        }
      } else {
        if (user !== null) {
          const msg = {
            to: user.email,
            from: 'buddikadilan3@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: 'your request is accepted',
          };
          //sgMail.send(msg);
          res.status(200).json({ msg: 'email send' });
        } else {
          res.status(404).json({ msg: 'user does not exist' });
        }
      }
    }
  );
}

const rej = (req, res, next) => {
  user.findByIdAndUpdate(
    req.body.id,
    {pending: false ,userType: 'gen', category: 'null'},
    { new: true, useFindAndModify: false, select: '-password' },
    (err, user) => {
      if (err) {
        if (err.kind && err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'please sign in' });
        } else {
          return res.status(500).json({ msg: 'internal server error' });
        }
      } else {
        if (user !== null) {
          const msg = {
            to: user.email,
            from: 'buddikadilan3@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: 'your requst is rejected',
          };
          //sgMail.send(msg);
          res.status(200).json({ msg: 'email send' });
        } else {
          res.status(404).json({ msg: 'user does not exist' });
        }
      }
    }
  );
}

module.exports = { accept: acc, reject: rej };
