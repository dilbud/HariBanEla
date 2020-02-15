const tag = require("../models/tagModel");

const createTag = (req, res, next) => {
  new tag({
    name: req.body.value
  }).save((err, user) => {
    if (err) {
      if (err.errors.email.kind && err.errors.email.kind === 'unique') {
        res.status(404).json({ msg: 'Tag already added' });
      } else {
        res.status(500).json({ msg: 'internal server error' });
      }
    } else {
      res.status(200).json({msg: 'created'});
    }
  });
}

const updateTag = (req, res, next) => {
  tag.findByIdAndUpdate(
    req.body.id,
    {name: req.body.value},
    { new: true, useFindAndModify: false},
    (err, user) => {
      if (err) {
          return res.status(500).json({ msg: 'internal server error' });
      } else {
        if (data !== null) {
          res.status(200).json({ msg: 'tag Added' });
        } else {
          res.status(404).json({ msg: 'tag does not exist' });
        }
      }
    }
  );
}

const getAllTag = (req, res, next) => {
  tag.find({},{ useFindAndModify: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ msg: "internal server error" });
    } else {
      res.status(200).json({
        msg: "ok",
        serverData: user
      });
    }
  });
}

module.exports = { create: createTag, update: updateTag , get: getAllTag };
