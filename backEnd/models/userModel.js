const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picURL: { type: String },
  userType: { type: String }, 
});


userSchema.plugin(uniqueValidator);



module.exports = mongoose.model('user', userSchema);
