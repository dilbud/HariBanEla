
const user = require('../models/userModel');


module.exports = (req, res) => {
  switch (req.query.type) {
    case 'admin':
      {
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
              console.log('**** - '+ product);
              res.status(200).json({msg: "ok"});
          }
        });
      }
      break;
    case 'professional':
        {
          new user.pro({
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
      break;
    case 'general':
        {
          new user.gen({
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
      break;
    default:
      res.status(406).json({ val: 'invalid user type' });
      break;
  }







      
}