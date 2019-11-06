module.exports = function (req, res) {
  res.cookie('name', 'express').sendStatus(200);
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  }