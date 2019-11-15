
const user = require('../models/userModel');


module.exports = (req, res) => {
        console.log(req.body);

          res.status(200).json({msg: 'ok'});
    
    
      // res.status(406).json({ val: 'invalid user type' });
  }