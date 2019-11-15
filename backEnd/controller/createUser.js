const user = require('../models/userModel');
module.exports = (req, res) => {
    console.log('xxxxxxxxxxxxxxxxxxxxxx');
console.log(req.body);
new user({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  address: req.body.address,
  email: req.body.email,
  password: req.body.password,
  picURL: req.body.picURL,
  userType: req.body.userType, 
}).save((err, product) => {
  if (err) {
      res.status(406).json({error: err});
  } else {
    const token = jwt.sign({id: product._id}, key, {expiresIn: '2h'});
    const a = jwt.decode(token);
      console.log('**** - '+ product);
      res.status(200).json({msg: "ok", serverData: {
          id: product._id,
          firstName: product.firstName,
          lastName: product.lastName,
          address: product.address,
          email: product.email,
          picURL: product.picURL,
          userType: product.picURL
        }});
  }
});
}
