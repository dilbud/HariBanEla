const user = require('../models/userModel');

deactivate = (req, res, next) => {
  user.findByIdAndUpdate(req.body.id, { active: false }, {new:true , useFindAndModify: false}, (err, data) => {
    if(err){
      return res.status(500).json({ msg: "internal server error" });
    }else {
      res.status(200).json({msg: "user deactivated",});
    }
  });
}

activate = (req, res, next) => {
  user.findByIdAndUpdate(req.body.id, { active: true }, {useFindAndModify: false}, (err, data) => {
    if(err){
      return res.status(500).json({ msg: "internal server error" });
    }else {
      res.status(200).json({msg: "user activated",});
    }
  });
}

module.exports = { enable: activate, disable: deactivate };
