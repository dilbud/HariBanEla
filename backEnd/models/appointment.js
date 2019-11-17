const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  professionalId: {
    type: String,
    required: true,
  },
  professionalName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
    default: 1,
  },
  status: {
    type: String,
    required: true,
    default: 'Rejected',
  },
  chatUrl: {
    type: String,
    required: true,
    default: 'null',
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'Pending',
  },
  paymentAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentUrl: {
    type: String,
    required: true,
    default: 'null',
  },

});

module.exports = mongoose.model('Appointment', AppointmentSchema);
