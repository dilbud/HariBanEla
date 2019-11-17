const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const requestSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picURL: { type: String },
  userType: { type: String }, 
});


requestSchema.plugin(uniqueValidator);



module.exports = mongoose.model('request', requestSchema);