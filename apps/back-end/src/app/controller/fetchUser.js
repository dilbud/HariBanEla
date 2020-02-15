const user = require("../models/userModel");

module.exports = (req, res, next) => {
  let id = req.body.id;

  user.findById(id, "-password", { useFindAndModify: false }, (err, user) => {
    if (err) {
      if (err.kind && err.kind === "ObjectId") {
        return res.status(404).json({ msg: "please sign in" });
      } else {
        return res.status(500).json({ msg: "internal server error" });
      }
    } else {
      res.status(200).json({
        msg: "ok",
        serverData: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          email: user.email,
          picURL: user.picURL,
          userType: user.userType,
          paymentPerHour: 2000,
          category: user.category,
          doc: user.doc,
          pending: user.pending,
          rate: user.rate,
          paymentPerHour: user.paymentPerHour,
          active: user.active
        }
      });
    }
  });
};
