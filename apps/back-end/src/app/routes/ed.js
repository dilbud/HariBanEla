const express = require('express');
const ed = require('../controller/edUser');

export const edRouter = express.Router();
//  enable disable user Router
edRouter.post('/activeUser', ed.enable);
edRouter.post('/deactivateUser', ed.disable);
