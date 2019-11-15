const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picURL: { type: String },
  userType: { type: String }, 
});


user.plugin(uniqueValidator);



module.exports = mongoose.model('user', user);
