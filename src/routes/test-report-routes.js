const express = require('express');

const router = express.Router();
const testReport = require('../controllers/test-report-controller');
const validation = require('../validations/test-report-validations');
const authentication = require('../middleware/authentication');

// comment
router.get('/comment', validation.getReportCommentList, authentication, testReport.listReportComment);
router.post('/comment', validation.createReportComment, authentication, testReport.createReportComment);

// Routes For Appointment Service

router.post('/', validation.createTestReport, authentication, testReport.createTestReport);
router.get('/', validation.getTestReportList, authentication, testReport.listTestReport);
router.get('/:reportId', validation.getTestReport, authentication, testReport.getTestReport);

module.exports = router;
