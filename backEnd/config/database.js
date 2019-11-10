var mongoose = require('mongoose');


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4
};

exports.connection = function () {
  mongoose.connect('mongodb+srv://s3rv3r:FpfEYWeDsFayVTWi@mydb-iz8ru.gcp.mongodb.net/test', options)
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

}
exports.secretOrKey = "*{%4K58#d[3n";
