const user = require("../models/userModel");

const getProfile = (req, res, next) => {
  let id = req.query.id;

  user.findById(id, "firstName lastName address email picURL userType", (err, data) => {
    if (err) {
      console.log(err, "----------------------------/////////////////////");
      if (err.kind && err.kind === "ObjectId") {
        return res.status(404).json({ msg: "please sign in" });
      } else {
        return res.status(500).json({ msg: "internal server error" });
      }
    } else {
      details = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        picURL: data.picURL,
        userType: data.userType
      };
      console.log(details);
      res.status(200).json({ msg: "ok", serverData: details });
    }
  });
};

const listProfile = (req, res, next) => {
  user.find(
    { userType: "pro" },
    "firstName lastName address email picURL userType",
    (err, data) => {
      if (err) {
        console.log(err, "----------------------------/////////////////////");
        if (err.kind && err.kind === "ObjectId") {
          return res.status(404).json({ msg: "please sign in" }); // not fit to me
        } else {
          return res.status(500).json({ msg: "internal server error" });
        }
      } else {
        details = {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          email: data.email,
          picURL: data.picURL,
          userType: data.userType
        };
        console.log(data);
        res.status(200).json({ msg: "ok", serverData: data });
      }
    }
  );
};

module.exports = { get: getProfile, list: listProfile };
