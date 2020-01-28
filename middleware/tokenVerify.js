var jwt = require('jsonwebtoken');

const key = 'df678g68g786fd88fd67g8fdfd8g7fd8g7';

const verify = (req, res, next) => {
    const authHead = req.headers.authorization;
    var token = authHead.split(' ')[1];
    console.log('row token -----',token);
    jwt.verify(token, key, (err, decode) => {
      if(err) {
        res.status(401).json({msg: 'please login or signup'})
      } else {
          const decoded = jwt.decode(token);
          console.log('decoded token ----', decoded);
          next();
      }
    });
  }

  module.exports = verify;