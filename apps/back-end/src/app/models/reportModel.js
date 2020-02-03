const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    type: { type: String, required: true },
    userId: { type: String, required: false, default: 'null' },
    name: { type: String, required: false, default: 'null' },
    email: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
    content: { type: String, required: false, default: 'null' },
  });

module.exports = mongoose.model('report', reportSchema);