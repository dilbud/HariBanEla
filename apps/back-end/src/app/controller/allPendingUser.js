const user = require('../models/userModel');

module.exports = (req, res, next) => {
  user.find(
    { pending: true },
    '-password',
    { useFindAndModify: false },
    (err, user) => {
      if (err) {
        if (err.kind && err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'please sign in' });
        } else {
          return res.status(500).json({ msg: 'internal server error' });
        }
      } else {
        res.status(200).json({
          msg: 'ok',
          serverData: user
        });
      }
    }
  );
};
