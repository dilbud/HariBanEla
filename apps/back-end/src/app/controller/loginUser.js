const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
var SHA256 = require('crypto-js/sha256');
const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';
// login with local email name password
module.exports = (req, res) => {
  const hash = SHA256(req.body.password).toString();
  user
    .findOne({ email: req.body.email, password: hash })
    .select('-password')
    .lean()
    .exec((err, user) => {
      console.log(
        'kkkkkkkkkkkkkkkkkkkkk',
        req.body.password,
        req.body.email,
        hash,
        user
      );
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
