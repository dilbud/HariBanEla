const express = require('express');
const signup = require('../controller/signup');
const login = require('../controller/login');
const publicKey = require('../controller/publicKey');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/key', publicKey);


module.exports = router;
