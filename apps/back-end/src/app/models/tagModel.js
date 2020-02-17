const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      }
});

TagSchema.plugin(uniqueValidator);
module.exports = mongoose.model('tag', TagSchema);
