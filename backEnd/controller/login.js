const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

module.exports = (req, res) => {
  console.log(req.body);
  user
    .findOne({ email: req.body.email, password: req.body.password })
    .select('-password')
    .lean()
    .exec((err, user) => {
      if (err) {
        res.status(500).json({ msg: 'internal server error' });
      } else if (user !== null) {
        const token = jwt.sign({ id: user._id }, key, { expiresIn: '2h' });
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
            userType: user.userType
          }
        });
      } else {
        res.status(404).json({ msg: 'user does not exist' });
      }
    });
};
