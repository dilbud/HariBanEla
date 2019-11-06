var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontEnd/dist/frontEnd', 'index.html'));
});

module.exports = router;

