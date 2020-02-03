const express = require('express');
const router = express.Router();

export const reportRouter = express.Router();

reportRouter.post('/feedback', report.feedback);
reportRouter.post('/resetPassword', report.resetPassword);
reportRouter.post('/reportPost', report.reportPost);
reportRouter.post('/reportUser', report.reportUser);

module.exports = router;