const express = require('express');
const report = require('../controller/report');

export const reportRouter = express.Router();

reportRouter.post('/feedback', report.feedback);
reportRouter.post('/resetPassword', report.resetPassword);
reportRouter.post('/reportPost', report.reportPost);
reportRouter.post('/reportUser', report.reportUser);
