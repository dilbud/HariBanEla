const mongoose = require('mongoose');
import { environment } from '../../environments/environment';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4
};

export const connection = function() {
  mongoose
    .connect(
    environment.databaseUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    .then(() => console.log('connection successful'))
    .catch(err => console.error(err));
};
export const secretOrKey = '*{%4K58#d[3n';
