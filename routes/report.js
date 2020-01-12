const express = require('express');
const router = express.Router();

const report = require('../controller/report');

router.post('/feedback', report.feedback);
router.post('/resetPassword', report.resetPassword);
router.post('/reportPost', report.reportPost);
router.post('/reportUser', report.reportUser);

module.exports = router;