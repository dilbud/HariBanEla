const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';
var generator = require('generate-password');
var SHA256 = require('crypto-js/sha256');

const social = (req, res, next) => {
  var password = generator.generate({
    length: 10,
    numbers: true
  });

  new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    password: SHA256(password).toString(),
    picURL: req.body.picURL,
    userType: req.body.userType
  }).save((err, user) => {
    if (err) {
      if (err.errors.email.kind && err.errors.email.kind === 'unique') {
        next();
      } else {
        res.status(500).json({ msg: 'internal server error' });
      }
    } else {
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
      };
      const token = jwt.sign({ id: user._id, userData: details }, key, {
        expiresIn: '2h'
      });
      res.status(200).json({
        msg: 'created',
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
  });
};

const socialLogin = (req, res) => {
  user
    .findOne({ email: req.body.email })
    .select('-password')
    .lean()
    .exec((err, user) => {
      if (err) {
        res.status(500).json({ msg: 'internal server error' });
      }
      if (user.active === false) {
        res.status(404).json({ msg: 'User blocked by Administrator' });
      } else if (user !== null) {
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
        };
        const token = jwt.sign({ id: user._id, userData: details }, key, {
          expiresIn: '2h'
        });
        res.status(200).json({
          msg: 'exist',
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
      } else {
        res.status(404).json({ msg: 'user does not exist' });
      }
    });
};

module.exports = { social: social, login: socialLogin };
