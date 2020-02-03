var cors = require('cors');

const option = {
    "origin": "*",
    "methods": "*",
    "allowedHeaders": "*",
    "exposedHeaders": "*",
    "credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

module.exports = cors(option);
