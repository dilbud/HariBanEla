const express = require('express');
const ed = require('../controller/edUser');

export const edRouter = express.Router();

edRouter.post('/activeUser', ed.enable);
edRouter.post('/deactivateUser', ed.disable);
