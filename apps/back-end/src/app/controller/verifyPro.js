const sgMail = require('../config/sendGrid').sgMail;
const user = require("../models/userModel");


const acc = (req, res, next) => {
  ((err, data)=>{
    if(err) {
      res.status(500).json({ msg: 'internal server error' });
    }else {
      res.status(200).json({ msg: 'accepted' });
    }
  });
}

const rej = (req, res, next) => {
  ((err, data)=>{
    if(err) {
      res.status(500).json({ msg: 'internal server error' });
    }else {
      res.status(200).json({ msg: 'rejected' });
    }
  });
}

module.exports = { accept: acc, reject: rej };
