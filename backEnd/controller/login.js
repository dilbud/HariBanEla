const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

const admin = (req, res) => {
  console.log(req.body);
    user
      .findOne({ email: req.body.email, password: req.body.password })
      .select('-email -password')
      .lean()
      .exec((err, user) => {
        if (err) {
          console.log('internal error');
          res.status(500).json({msg: 'internal server error'});
        } else if (admin !== null) {
          const token = jwt.sign({id: admin._id}, key, {expiresIn: '500'});
          const a = jwt.decode(token);
          res.status(200).json({msg: 'user found',user: admin, token: token});
        } else {
          console.log('user does not exist');
          res.status(404).json({msg: 'user does not exist'});
        }
      });
  }

  module.exports = user;
