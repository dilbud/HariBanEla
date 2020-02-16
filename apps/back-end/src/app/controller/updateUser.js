const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const sgMail = require('../config/sendGrid').sgMail;

const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

module.exports = (req, res, next) => {
  let query
  if(req.body.query.password === "12345678") {

    if(req.body.query.userType === 'gen') {
      query = {
        firstName: req.body.query.firstName,
        lastName: req.body.query.lastName,
        address: req.body.query.address,
        userType: req.body.query.userType,
        category: req.body.query.category,
        pending: false
      };
    }
    if(req.body.query.userType === 'pro') {
      query = {
        firstName: req.body.query.firstName,
        lastName: req.body.query.lastName,
        address: req.body.query.address,
        userType: 'gen',
        category: req.body.query.category,
        pending: true
      };
    }

  } else{

    if(req.body.query.userType === 'gen') {
      query = {
        firstName: req.body.query.firstName,
        lastName: req.body.query.lastName,
        address: req.body.query.address,
        password: req.body.query.password,
        userType: req.body.query.userType,
        category: req.body.query.category,
        pending: false
      };
    }
    if(req.body.query.userType === 'pro') {
      query = {
        firstName: req.body.query.firstName,
        lastName: req.body.query.lastName,
        address: req.body.query.address,
        password: req.body.query.password,
        userType: 'gen',
        category: req.body.query.category,
        pending: true
      };
    }
  }

  let id = req.body.id;
  const userTypeNew = req.body.query.userType;
  if (id === undefined || id === null) {
    return res.status(404).json({ msg: 'please sign in' });
  }

  user.findByIdAndUpdate(
    id,
    query,
    { new: true, useFindAndModify: false, select: '-password' },
    (err, user) => {
      if (err) {
        if (err.kind && err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'please sign in' });
        } else {
          return res.status(500).json({ msg: 'internal server error' });
        }
      } else {
        console.log('xxxxxxxxxxxxxxxxxxxxxxx ', user);

        if(user.pending === true && user.userType === 'gen') {
          const msg = {
            to: user.email,
            from: 'buddikadilan3@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: 'pleace attach document with this email',
          };
          //sgMail.send(msg);
        }
        details = {
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          email: user.email,
          picURL: user.picURL,
          userType: user.userType,
          category: user.category,
          doc: user.doc,
          pending: user.pending,
          rate: user.rate,
          paymentPerHour: user.paymentPerHour,
          active: user.active
        }
        const token = jwt.sign({ id: user._id, userData: details }, key, { expiresIn: '2h' });
        res.status(200).json({
          msg: 'ok',
          token: token,
          serverData: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            email: user.email,
            picURL: user.picURL,
            userType: user.userType,
            category: user.category,
            doc: user.doc,
            pending: user.pending,
            rate: user.rate,
            paymentPerHour: user.paymentPerHour,
            active: user.active
          }
        });
      }
    }
  );
};
