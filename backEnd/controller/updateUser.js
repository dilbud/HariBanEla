const jwt = require('jsonwebtoken');

const user = require('../models/userModel');

const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

module.exports = (req, res) => {
  console.log(req.headers);
  const query = {
    firstName: req.body.query.firstName,
    lastName: req.body.query.lastName,
    address: req.body.query.address,
    password: req.body.query.password,
    userType: req.body.query.userType
  }
  const id = req.body.id;
  if(id === undefined ){
    return res.status(404).json({ msg: 'please sign in' });
  }
  user.findByIdAndUpdate(id, query, { new: true, useFindAndModify: false, select: '-password' }, (err, user) => {
    if (err) {
      if (err.kind && err.kind === 'ObjectId') {
        console.log(err);
        return res.status(404).json({ msg: 'please sign in' });
      } else {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
      }
    } else {
      console.log('/////////////');
      console.log(user);
      const token = jwt.sign({ id: user._id  }, key, { expiresIn: '2h' });
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
            userType: user.userType
          }
        });
    }
  });

  // res.status(406).json({ val: 'invalid user type' });
};
