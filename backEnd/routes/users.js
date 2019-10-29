const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require("../models/user");

const router = express.Router();


const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

mongoose.model("User", userSchema);

router.post("/signup", (req, res, next) => {
    console.log(req.body.email + "  " + req.body.password);
    const user = new Post({
      email: 'hsdbfhjdsbf',
      password: 'kdhfoksahd'
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
      
        });
      });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return req.body.password === user.password;
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
