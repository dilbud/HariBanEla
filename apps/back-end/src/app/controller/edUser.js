const user = require('../models/userModel');
const sgMail = require('../config/sendGrid').sgMail;

deactivate = (req, res, next) => {
  user.findByIdAndUpdate(req.body.id, { active: false }, {new:true , useFindAndModify: false}, (err, data) => {
    if(err){
      return res.status(500).json({ msg: "internal server error" });
    }else {
      if (data.userType === 'pro') {
        const msg = {
          to: data.email,
          from: 'buddikadilan3@gmail.com',
          subject: 'Sending with Twilio SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: 'your account  is deactivated',
        };
      //sgMail.send(msg);
      }
      res.status(200).json({msg: "user deactivated",});
    }
  });
}

activate = (req, res, next) => {
  user.findByIdAndUpdate(req.body.id, { active: true }, {useFindAndModify: false}, (err, data) => {
    if(err){
      return res.status(500).json({ msg: "internal server error" });
    }else {

      if (data.userType === 'pro') {
        const msg = {
          to: data.email,
          from: 'buddikadilan3@gmail.com',
          subject: 'Sending with Twilio SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: 'your accout is reactivated',
        };
        //sgMail.send(msg);
      }
      res.status(200).json({msg: "user activated",});
    }
  });
}

module.exports = { enable: activate, disable: deactivate };
