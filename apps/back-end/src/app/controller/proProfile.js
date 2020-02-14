const user = require("../models/userModel");

const getProfile = (req, res, next) => {
  let id = req.query.id;

  user.findById(id, "-password", (err, user) => {
    if (err) {
      if (err.kind && err.kind === "ObjectId") {
        return res.status(404).json({ msg: "please sign in" });
      } else {
        return res.status(500).json({ msg: "internal server error" });
      }
    } else {
      details = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        email: user.email,
        picURL: user.picURL,
        userType: user.userType,
        category: user.category,
        doc: user.doc,
        pending: user.pending,
        rate: user.rate,
        paymentPerHour: user.paymentPerHour,
        active: user.active
      };
      res.status(200).json({ msg: "ok", serverData: details });
    }
  });
};

const listProfile = (req, res, next) => {
  user.find(
    { userType: "pro" },
    "-password",
    (err, data) => {
      if (err) {
        if (err.kind && err.kind === "ObjectId") {
          return res.status(404).json({ msg: "please sign in" }); // not fit to me
        } else {
          return res.status(500).json({ msg: "internal server error" });
        }
      } else {
        res.status(200).json({ msg: "ok", serverData: data });
      }
    }
  );
};

module.exports = { get: getProfile, list: listProfile };
