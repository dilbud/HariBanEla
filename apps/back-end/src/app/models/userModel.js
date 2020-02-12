const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picURL: { type: String },
  doc: {type: [String], default: null},
  userType: { type: String },
  pending: {type: Boolean, default: false},
  category: {type: String , default: 'null'},
  rate: {type: Number, default: 0}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
