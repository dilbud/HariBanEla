const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const proSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  tp: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nicURL: { type: String, required: true },
  docURL: { type: String, required: true }
});

const genSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  tp: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const adminSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});



proSchema.plugin(uniqueValidator);
genSchema.plugin(uniqueValidator);
adminSchema.plugin(uniqueValidator);



const pro = mongoose.model('pro', proSchema);
const gen = mongoose.model('gen', genSchema);
const admin = mongoose.model('admin', adminSchema);


module.exports = {'pro': pro, 'gen': gen, 'admin': admin};
