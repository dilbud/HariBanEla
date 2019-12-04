const user = require('../models/userModel');


module.exports =  (req, res, next) => {
  // console.log('555555555555555555555555555555555');
  console.log(req.body.id);
    let id  = req.body.id;

  user.findById(
    id,
    '-password',
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        console.log(err);
        if (err.kind && err.kind === 'ObjectId') {
          mod = true;
          return res.status(404).json({ msg: 'please sign in' });
        } else {
          mod = true;
          return res.status(500).json({ msg: 'internal server error' });
        }
      } else {

        // console.log('555555555555555555555555555555555');
    
        // console.log(data);

        res.status(200).json({
            msg: 'ok',
            serverData: {
              id: data._id,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              email: data.email,
              picURL: data.picURL,
              userType: data.userType,
              paymentPerHour:2000,
            }
          });
// console.log(data.paymentPerHour);


      }
    }
  );


}