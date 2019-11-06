var mongoose = require('mongoose');

exports.connection = function () {
  mongoose.connect('mongodb+srv://s3rv3r:FpfEYWeDsFayVTWi@mydb-iz8ru.gcp.mongodb.net/test', {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true,})
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

}
exports.secretOrKey = "*{%4K58#d[3n";
