const express = require('express');
var jwt = require('jsonwebtoken');

const signup = require('../controller/signup');
const login = require('../controller/login');

const user = require('../models/userModel');

const router = express.Router();
const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

router.post('/signup', signup);

router.post(
  '/login',
  (req, res, next) => {
    user.admin
      .findOne({ email: req.body.email, password: req.body.password })
      .select('-email -password')
      .lean()
      .exec((err, admin) => {
        if (err) {
          console.log('internal error');
          res.status(500).json({msg: 'internal server error'});
        } else if (admin !== null) {
          let token = jwt.sign({id: admin._id}, key, {expiresIn: '500'});
          console.log(jwt.decode(token));
          res.status(200).json({msg: 'admin found',user: admin, token: token});
        } else {
          console.log('admin does not exist');
          next();
        }
      });
  },
  (req, res, next) => {
    user.pro
      .findOne({ email: req.body.email, password: req.body.password })
      .select('-email -password')
      .lean()
      .exec((err, professional) => {
        if (err) {
          console.log('internal error');
          res.status(500).json({msg: 'internal server error'});
        } else if (professional !== null) {
          console.log(JSON.stringify(professional));
          res.status(200).json({msg: 'professional found',user: professional});
        } else {
          console.log('professional does not exist');
          next();
        }
      });
  },
  (req, res, next) => {
    user.gen
      .findOne({ email: req.body.email, password: req.body.password })
      .select('-email -password')
      .lean()
      .exec((err, general) => {
        if (err) {
          console.log('internal error');
          res.status(500).json({msg: 'internal server error'});
        } else if (general !== null) {
          console.log(JSON.stringify(general));
          res.status(200).json({msg: 'general found',user: general});
        } else {
          console.log('general does not exist');
          res.status(404).json({msg: 'user does not exist'});
        }
      });
  }
);

module.exports = router;
