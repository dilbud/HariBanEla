// 536808005835-lqmmujjncb20550usi2kgseudq2a8pn1.apps.googleusercontent.com
// ghPu0CoJtAfloUCQ2OeGk31W

const express = require('express');

const user = require('../models/userModel');
const update = require('../controller/updateUser');
const create = require('../controller/createUser');
const login = require('../controller/loginUser');
const verify = require('../middleware/tokenVerify');
const fechUser = require('../controller/fetchUser');


const router = express.Router();

router.post('/update', verify, update);
router.post('/create', create.social , create.login);
router.post('/login', login);
router.post('/getUserById', fechUser);

module.exports = router;
