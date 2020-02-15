var mongoose = require('mongoose');
// mongodb+srv://s3rv3r:FpfEYWeDsFayVTWi@mydb-iz8ru.gcp.mongodb.net/test

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4
};

exports.connection = function () {
  mongoose.connect('mongodb+srv://dbAdmin:2fYaO7Ovhl2SQmWN@cluster0-ovc3p.mongodb.net/hariBnEla?retryWrites=true', { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

}
exports.secretOrKey = "*{%4K58#d[3n";
