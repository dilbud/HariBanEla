const verifcby = (req, res, next) => {
    const authHead = req.headers.authorization;
    console.log(authHead);
    var result = JSON.parse(authHead);
    result.token202.idToken
  
    
    
    got('https://oauth2.googleapis.com/tokeninfo?id_token=' +  result.token202.idToken, { json: true }).then(response => {
    console.log(response.body.email);
  }).catch(error => {
    console.log(error.response.body);
  });
  
  
    if(result.token101 === null) {
      res.status(401).json({msg: 'please '});
    }
  }
  


const verify = (req, res, next) => {
    console.log(req.headers);
    const authHead = req.headers.authorization;
    var token = authHead.split(' ')[1];
    console.log(token);
    jwt.verify(token, key, (err, decode) => {
      if(err) {
        res.status(401).json({msg: 'please login or signup'})
      } else {
          console.log(decode);
          next();
      }
    });
  }

  module.exports = verify;