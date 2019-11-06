
const user = require('../models/userModel');

module.exports = (req, res) => {
    new user.admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
      }).save((err, product) => {
        if (err) {
            res.status(406).json({error: err});
        } else {
            res.status(200).json({msg: "ok"});
        }
      });
      
}