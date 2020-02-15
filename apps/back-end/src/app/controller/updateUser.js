const jwt = require('jsonwebtoken');

const user = require('../models/userModel');

const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

module.exports = (req, res, next) => {
  let query
  if(req.body.query.password === "12345678") {
    query = {
      firstName: req.body.query.firstName,
      lastName: req.body.query.lastName,
      address: req.body.query.address,
      userType: req.body.query.userType,
      category: req.body.query.category
    };
  } else{
    query = {
      firstName: req.body.query.firstName,
      lastName: req.body.query.lastName,
      address: req.body.query.address,
      password: req.body.query.password,
      userType: req.body.query.userType,
      category: req.body.query.category
    };
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
