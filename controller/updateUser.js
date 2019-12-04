const jwt = require('jsonwebtoken');

const user = require('../models/userModel');

const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

module.exports = (req, res, next) => {
  console.log('update user ----------------');
  const query = {
    firstName: req.body.query.firstName,
    lastName: req.body.query.lastName,
    address: req.body.query.address,
    password: req.body.query.password,
    userType: req.body.query.userType
  };
  let id = req.body.id;
  const userTypeNew = req.body.query.userType;
  if (id === undefined || id === null) {
    return res.status(404).json({ msg: 'please sign in' });
  }
  // user.findById(
  //   id,
  //   'userType pending',
  //   { lean: true, useFindAndModify: false },
  //   (err, data) => {
  //     if (err) {
  //       if (err.kind && err.kind === 'ObjectId') {
  //         mod = true;
  //         return res.status(404).json({ msg: 'please sign in' });
  //       } else {
  //         mod = true;
  //         return res.status(500).json({ msg: 'internal server error' });
  //       }
  //     } else {
  //       const pending = data.pending;
  //       const userTypeOld = data.userType;
  //       console.log('*******************************************');
  //       console.log(pending, userTypeNew, userTypeOld);
  //       if (pending === true) {
  //         mod = true;
  //         return res.status(406).json({ msg: 'please wait for verify' });
  //       } else if (userTypeNew === 'gen' && userTypeOld === 'pro') {
  //         mod = true;
  //         return res.status(406).json({ msg: 'please contact us !' });
  //       } else if (
  //         (userTypeNew === 'pro' && userTypeOld === 'gen') ||
  //         (userTypeNew === 'pro' && userTypeOld === 'pro')
  //       ) {
  //         mod = true;
  //         return res.status(406).json({ msg: 'please contact us !1' });
  //         // next(); verify
  //       } else {
  //         mod = false;
  //         return res.status(406).json({ msg: 'please contact us !2' });
  //       }
  //     }
  //   }
  // );


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
        details = {
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          email: user.email,
          picURL: user.picURL,
          userType: user.userType
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
            userType: user.userType
          }
        });
      }
    }
  );
};