// 536808005835-lqmmujjncb20550usi2kgseudq2a8pn1.apps.googleusercontent.com
// ghPu0CoJtAfloUCQ2OeGk31W

const express = require('express');
// user Router
const user = require('../models/userModel');
const update = require('../controller/updateUser');
const create = require('../controller/createUser');
const login = require('../controller/loginUser');
const verify = require('../middleware/tokenVerify');
const fechUser = require('../controller/fetchUser');
const proProfile = require('../controller/proProfile');
const allUser = require('../controller/allUser');
const allPendingUser = require('../controller/allPendingUser');

export const userRouter = express.Router();

userRouter.post('/update', verify, update);
userRouter.post('/create', create.social, create.login);
userRouter.post('/login', login);
userRouter.post('/getUserById', fechUser);
userRouter.get('/proList', proProfile.list);
userRouter.get('/proProfile', verify, proProfile.get);
userRouter.get('/allUser', verify, allUser);
userRouter.get('/allPendingUser', verify, allPendingUser);
