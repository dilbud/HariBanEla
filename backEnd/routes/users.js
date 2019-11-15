// 536808005835-lqmmujjncb20550usi2kgseudq2a8pn1.apps.googleusercontent.com
// ghPu0CoJtAfloUCQ2OeGk31W
const { base64encode, base64decode } = require('nodejs-base64');
const express = require('express');
var jwt = require('jsonwebtoken');
const got = require('got');

const user = require('../models/userModel');


const update = require('../controller/updateUser');
const create = require('../controller/createUser');
const login = require('../controller/login');


const router = express.Router();
const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

router.post('/update', update);

router.post('/create', create);


router.post(
  '/login',
  (req, res) => {
    console.log(req.body);
    user.findOne({ email: req.body.email, password: req.body.password })
      .select('-password')
      .lean()
      .exec((err, user) => {
        if (err) {
          console.log('internal error');
          res.status(500).json({msg: 'internal server error'});
        } else if (user !== null) {
          let token = jwt.sign({id: user._id}, key, {expiresIn: '2h'});
          const val = jwt.decode(token);
          console.log('user found');
          console.log(user);
          let userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            email: user.email,
            picURL: user.picURL,
            userType: user.userType
          } 
          res.status(200).json({msg: 'admin found',user: userData , tokenData : {
            userId: val.id,
            userType: user.userType,
            iat: val.iat,
            exp: val.exp,
            token: token
          }});
        } else {
          console.log('user does not exist');
          res.status(404).json({msg: 'user does not exist'});
        }
      });
  }
);



module.exports = router;
