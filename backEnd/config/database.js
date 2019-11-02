var mongoose = require('mongoose');

exports.connection = function () {
  mongoose.connect('mongodb+srv://dbAdmin:2fYaO7Ovhl2SQmWN@cluster0-ovc3p.mongodb.net/hariBnEla?retryWrites=true', { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

}
exports.secretOrKey = "*{%4K58#d[3n";
