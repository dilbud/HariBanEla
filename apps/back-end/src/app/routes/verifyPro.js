const express = require('express');
const verifyPro = require('../controller/verifyPro');

export const verifyProRouter = express.Router();
// verify professional
verifyProRouter.post('/accept', verifyPro.accept);
verifyProRouter.post('/reject', verifyPro.reject);
