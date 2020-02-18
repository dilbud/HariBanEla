const express = require('express');
const report = require('../controller/report');

export const reportRouter = express.Router();

reportRouter.post('/setfeedback', report.feedbackSet);
reportRouter.get('/getfeedback', report.feedbackGet);
reportRouter.post('/deletefeedback', report.feedbackDelete);

reportRouter.post('/resetPassword', report.password);

reportRouter.post('/reportPost', report.reportPost);
reportRouter.get('/getReportPost', report.getReportPost);
reportRouter.post('/deleteReportPost', report.deleteReportPost);

reportRouter.post('/reportUser', report.reportUser);
reportRouter.get('/getReportUser', report.getReportUser);
reportRouter.post('/deleteReportUser', report.deleteReportUser);
